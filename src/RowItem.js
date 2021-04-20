// import base
import React from 'react';
 
// import Material-UI
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Chip from '@material-ui/core/Chip';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { TableBody } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';

// import stylesheet
import './App.css';
import 'typeface-roboto';

// invertHex - used to find an inverted color so that a chip's text is readable on the colored background, while on a white page
function invertHex(hex) {
    return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
}

// RowItem
//      Each item in the selection list will be rendered by the RowItem
//      This includes:
//          - A green check icon if open state or red alert icon if closed
//          - The title, which is an HTML link to the GitHub issue page
//          - The labels (as Material-UI chips, colored based on the data returned from the API query)
//          - The issue number, the date of the creation of the issue and the last updated date and the creator (user login name)   
export default function RowItem(props) {
    const emptyProps = Object.getOwnPropertyNames(props).length === 0 ? true : false;
    const {author, created, lastupdated, labels, link, number, status, title} = props;
    
    return(
        <div>
        {emptyProps===true ?
            <br />
        :
        <TableContainer component={Paper}> 
        <Table className="table">
            <TableBody align="left" className="tablebody">
                <TableRow>
                    <TableCell className="tablecell tableIcon" align="left">
                        {status === "open" ?
                            <CheckCircleOutlineIcon 
                                style={{ color: "green" }}
                            />
                        :
                            <ErrorOutlineIcon 
                                style={{ color: "red" }}
                            />
                        }
                    </TableCell>
                    <TableCell>
                        <a href={link} target="new">
                        <Typography className="titleItem">{title}</Typography>
                        </a>
                        {labels.map(itemLabel =>
                            <Chip 
                                label={itemLabel.name}
                                variant="outlined"
                                color="primary"
                                style={{ color: `#${invertHex(itemLabel.color)}`, backgroundColor: `#${itemLabel.color}` }}
                            />
                        )}
                        <Typography className="userItem">#{number} Created on {created} by {author} (last updated on {lastupdated})</Typography>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
        }
        </div>
    );
}
