// import Base 
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

// import Material-UI 
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// import custom functionality
import RowItem from './RowItem';
import useDebounce from "./useDebounce";

// import stylesheet
import './App.css';

//
// SearchForm - 
//      Take the debounced input from the user, then check with GitHub for results
export default function SearchForm() {
    // state variables
    const [projectName, setProjectName] = useDebounce({initValue: 'facebook/react', time: 1000});  
    const [searchValue, setSearchValue] = useDebounce({initValue: '', time: 500});      // debounce time for search terms set to 500ms
    const [data, setData] = useState([]);                                               // the raw data returned from GitHub search API
    const [selections, setSelections] = useState([{}]);                                 // the listed results
    const [showChangeGitHubProject, setShowChangeGitHubProject] = useState(false);      // option to show a textbox to let the user change the project to search (off by default)

    // default props for the Autocomplete component
    const defaultProps = {
        autoComplete: true,
        options: data,
        getOptionLabel: (option) => option.title,
    };
    
    // copyItemFields - 
    //      extract just the fields we need for display demo
    function copyItemFields(index) {
        const item = {};
        item.author = data[index].user.login;
        item.created = data[index].created_at;
        item.lastupdated = data[index].updated_at;
        item.labels = data[index].labels;
        item.link = data[index].html_url;
        item.number = data[index].number;
        item.status = data[index].state;
        item.title = data[index].title;
        
        return item;
    }

    // mapMatchingTitles
    //      make a map of which entries have the inputted searchValue in the title
    function mapMatchingTitles(title) {
        const mapping = [];
        const ltitle = title.toLowerCase();

        for( let i=0; i<data.length; i++ ) {
            const dlower = data[i].title.toLowerCase();

            if( (ltitle !== '' && dlower.indexOf(ltitle) > -1)  || dlower === ltitle) {
                mapping.push(i);
            }    
        }
        
        return mapping;
    }

    // handleSelection
    //      when the user mouse clicks or hits the Enter key on the search bar, determine item(s) that should be displayed
    function handleSelection(title) {
        const mapping = mapMatchingTitles(title);
        let item = {};
        const selectedItems = [];

        if (mapping.length > 0) {
            for( let i=0; i<mapping.length; i++ ) {
                item = copyItemFields(mapping[i]);
                selectedItems.push(item);
                item = {};
            }
        }

        // set the selections, triggering a redraw
        setSelections(selectedItems);
    };

    // handleKeyPress
    //      Watch for the Enter keypress to know when the user wants to execute the handleSelection function
    function handleKeyPress(event) {
        if (event.key ===  "Enter") {
            handleSelection(searchValue);
        }
    }

    // queryGitHub
    //      Perform an async GET on GitHub's Search API
    
    async function queryGitHub(projectName, searchTerm) {
        const searchData = searchTerm + '+in:title+repo:' + projectName;
        const query = 'https://api.github.com/search/issues?q=' + encodeURIComponent(searchData);
        const respData = [];

        console.log(query);
    
        try {
            let obj = {};
            const resp = await axios.get(query);
            
            // extract only the items array
            for( let i=0; i<resp.data.items.length; i++ ) {
                
                obj = JSON.parse(JSON.stringify(resp.data.items[i]));
                respData.push(obj);
                
                obj = {};
            }

            // store into the data state variable
            setData(respData);
        } catch(ex) {
            console.log(ex.response.data.message);
        }
    };
    
    // on changing of the projectName or searchValue (assuming they are not empty), perform the query
    useEffect(() => {
        if(projectName !== '' && searchValue  !== '') {
            queryGitHub(projectName, searchValue);
        }
    }, [projectName,searchValue]);

    // draw the components needed
    return(
        <div>
            <Fragment>
                <Typography>Searching Issues for GitHub project: <code><strong>{projectName}</strong></code></Typography>
                { showChangeGitHubProject===true ? 
                <TextField 
                    className="textfield"
                    label="Change GitHub project"
                    onChange={(event) => {
                        setProjectName(event.target.value)
                    }}
                    placeholder='facebook/react'
                    variant="outlined"
                />
                :
                <br />
                }
                <Autocomplete
                    {...defaultProps}
                    className="autocomplete"
                    id="issueSearch"
                    debug
                    renderInput={(params) => 
                        <TextField 
                            {...params} 
                            id="issueSearchText"
                            label="Search issues" 
                            margin="normal"
                            onChange={(event) => {setSearchValue(event.target.value)}}
                            onClick={() => {console.log("mouse clicked")}}
                            onKeyPress={(event) => {handleKeyPress(event)}}
                            onSelect={(event) => {handleSelection(event.target.value)}}
                            onClickCapture = {() => {console.log("onClickCapture clicked")}}
                            variant="outlined"
                        />
                    }
                />
                
                <br />                
            </Fragment>
            <Fragment>            
                {selections.map(item =>
                    <RowItem 
                        {...item}
                    />
                )}
            </Fragment>
        </div>
    );
}