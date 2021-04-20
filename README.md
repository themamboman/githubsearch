# David Gentry's GitHub autocomplete search Demo

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## What this Project demonstrates

- The ability to produce a ReactJS front-end application that meets the requirements of the task
- The ability to make asynchronous queries to a RESTful API on a remote server
- The understanding of debouncing user input before querying a server's API to avoid exceeding rate limits
- The ability to parse returned data for relevant information
- The ability to make a single-page app that changes display based on the state of variables
- The ability to use the Material-UI framework to speed development
- The ability to build a UI that is navigable by keyboard input as well as mouse
- Use of ReactJS Hooks


---
## Original Task description

This is original Task description sent to me for this project:

### Goal
-   We would like to have an opportunity to learn about your skills. 
    This is an open ended project where you should put as much effort as you consider right to show what you think is important.


### Delivery of Code
- Please share a Github repo with your code.


### Task
- Using Github’s API (https://developer.github.com/), build an application with an autocomplete input box for searching issues for React’s repo (https://github.com/facebook/react/issues). 
Input and results should be able to navigate via keyboard shortcuts. Each result should have but not limited to, the issue’s title and labels.
---
## Setting up and running the demo

Clone the repo to a directory.  In that directory, run `npm install` to set up the node modules needed.  This will take 
a moment.

To run this demo, run this command from the project directory: `npm start`.

After a few moments, a browser window should open to `http://localhost:3000`

Example usage:

- Click the `Start Demo` button to see the main interface.
The button at the top should return to the initial screen

- Below the button, it will show the owner/repo that will be serach for issues (should say facebook/react)
There is code in place to change this but I've disabled it on the UI for simplicity. To Enable it, change line 25
of SearchForm.js from `useState(false)` to `useState(true)` and run `npm start` again (if it didn't automatically
rebuild and refresh the page)

- Start typing a search term in the `Search issues` box.  For example, type "devtools". Once the
debounce timer (set to 500 ms) times out, it will make a network call to the github api endpoint.  If the browser
inspector is up and showing the network tab, you should see this XHR call:
`https://api.github.com/search/issues?q=devtools%2Bin%3Atitle%2Brepo%3Afacebook%2Freact`
(For simplicity, this tool searches for terms only in the issue titles, not body or comments)

- A list of suggesions will appear below the box where you typed "devtools".  If you only click the main box or hit the 
`Enter` key, then all avialable suggestions will be shown in detail below.

- If you navigate up and down the list with the keyboard arrow keys, then press the `Enter` key, it will just add that one
the detailed list below.

- The items in the detailed selection list will consist of a title, which is a hyperlink to the issue item page on GitHub.
Below this are Material-UI chips for each label (if there are any labels).  The colors of the Chips are determined by the
color field in the data returned for that item.
Below that is the Issue number, the creater name, and created and last updated dates.
If the issue is open, the Item will be preceeded by a green icon
If the issue is closed, the item will be preceeded by a red icon

- If there are multiple listed items, each will be a row.  The user can use the keyboard `Tab` button to navigate between them.
Whenever one is highlightd, the `Enter` key will do the same as clicking the link with a mouse click.

### Unit tests

A few, minimal tests were included to exercise the UI elements.  From the command prompt in the local directory, type `npm test` 
to run the UI tests

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Thank you for taking the time to look at this project!