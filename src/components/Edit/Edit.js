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

    //it would be nice to get the state to have the title and description set on page load
    state = ({
        selectedGenre: '',
        title: '',
        description: '',
    })
    goHome = (event) => {
        console.log('you are headed home');
                //move the user back to the details page for this listing
                this.props.history.push(`/details/${this.props.match.params.id}`);
    }
    handleEditGenre = () => {
        console.log('handle the genre edit here');
        // the selected genre is the number associated with the genre, not the name, 
        //because the junction table doesn't have the names, just the numbers.
        console.log(this.state.selectedGenre);
        //send the genre to add and the id that it'll be connected to to the saga
        this.props.dispatch({ type: 'ADD_LISTING_GENRE', payload: {selectedGenre: this.state.selectedGenre, id: this.props.match.params.id}});
                //move the user back to the details page for the same id, which will show the new genre
        this.props.history.push(`/details/${this.props.match.params.id}`);
    }

    handleEditMovie =() => {
        console.log('edit the movie', this.state);
        //send the data to the server/database
        this.props.dispatch({ type: 'EDIT_LISTING', payload: {title: this.state.title, description: this.state.description, id: this.props.match.params.id}})

        //move the user back to the details page
        this.props.history.push(`/details/${this.props.match.params.id}`);
    }

    handleChange = name => event => {
        console.log(event.target);
        this.setState({ [name]: event.target.value,});
      };

    render() {
        return(
            <div>
                <h2>Edit</h2>
                <>
                <TextField
                    id="change-title"
                    label="Title"
                    value={this.state.title}
                    onChange={this.handleChange('title')}
                    margin="normal"
                    />
                <TextField
                    id="change-description"
                    label="Description"
                    multiline
                    rowsMax="4"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                    />
                <Button 
                    variant="contained" 
                    onClick={this.handleEditMovie}
                    color="secondary">Save Movie Info
                </Button>
                </>
                <br />
                <>
                <TextField
                    id="select-genre"
                    select
                    label="Select"
                    value={this.state.selectedGenre}
                    onChange={this.handleChange('selectedGenre')}
                    helperText="Please select the genre to add"
                    margin="normal"
                    >
                        {/*this list is the list of the genres in the database
                        I would probably like to take this and remove from it
                        the ones that are already in use before using it here */}
                          {this.props.reduxState.allGenres.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                        {option.name}
                        </MenuItem>
                        ))}
                </TextField>
                <Button 
                    variant="contained" 
                    onClick={this.handleEditGenre}
                    color="secondary">Save New Genre
                </Button>
                </>
                <Button 
                    variant="contained" 
                    onClick={this.goHome}
                    color="primary">Cancel
                </Button>

            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
});

export default connect(putReduxStateOnProps)(Edit);