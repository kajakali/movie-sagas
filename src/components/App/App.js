import React, { Component } from 'react';
import { HashRouter as Router, Route, Link} from 'react-router-dom';
import { ThemeProvider, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import pink from '@material-ui/core/colors/pink';
import './App.css';
import Home from '../Home/Home';
import Details from '../Details/Details';
import Edit from '../Edit/Edit';

const theme = createMuiTheme({
  palette: {
    primary: {
      main:purple[200]
    },
    secondary: {
      main:pink[200]
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  }
});

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
        <MuiThemeProvider theme={theme}>
          <Router>
            <header>
              <h1>movies router</h1>
            </header>
            <nav>
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/details/47'>Details</Link>
                </li>
                <li>
                  <Link to='/edit/47'>Edit</Link>
                </li>
              </ul>
            </nav>
            <Route exact path='/' component={Home} />
            <Route path='/details/:id' component={Details} />
            <Route path='/edit/:id' component={Edit} />
          </Router>
        </MuiThemeProvider>
    )   
  };
}

export default App;
