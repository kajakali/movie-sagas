import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';
import { connect } from 'react-redux';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });





class Edit extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_ALL_GENRES'});
    }
    state = ({
        selectedGenre: ''
    })
    goHome = (event) => {
        console.log('you are headed home');
        this.props.history.push('/');
    }
    handleEdit = () => {
        console.log('handle the edit here');
        console.log(this.state.selectedGenre);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };
    render() {
        console.log('details this props', this.props);
        const classes = this.props.classes;
        return(
            <div>
                <h2>Edit</h2>
                <p>The `match` prop is: {JSON.stringify(this.props.match)}</p>
                <p>This is the edit page for item with id {this.props.match.params.id}!</p>
                <p>add a genre!!!</p>
                <p>add a genre to this line item!!!</p>
                <TextField
                    id="select-genre"
                     select
                     label="Select"
                    //  className={classes.textField}
                     value={this.state.selectedGenre}
                     onChange={this.handleChange('selectedGenre')}
  /*                   SelectProps={{
                        MenuProps: {
                        className: classes.menu,
                        },
                    }} */
                    helperText="Please select the genre to add"
                    margin="normal"
                    >
                          {this.props.reduxState.allGenres.map(option => (
                        <MenuItem key={option.id} value={option.name}>
                        {option.name}
                        </MenuItem>
                        ))}
                </TextField>
                <Button 
                    variant="contained" 
                    onClick={this.goHome}
                    color="primary">Home
                </Button>
                <Button 
                    variant="contained" 
                    onClick={this.handleEdit}
                    color="secondary">Edit
                </Button>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
});

export default connect(putReduxStateOnProps)(Edit);