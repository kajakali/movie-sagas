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
        selectedGenre: '',
        title: '',
        description: '',
    })
    goHome = (event) => {
        console.log('you are headed home');
        this.props.history.push('/');
    }
    handleEditGenre = () => {
        console.log('handle the genre edit here');
        console.log(this.state.selectedGenre);
            // get the matching number from the key of the menu...
        
        this.props.dispatch({ type: 'ADD_LISTING_GENRE', payload: {selectedGenre: this.state.selectedGenre, id: this.props.match.params.id}});
        this.props.history.push('/');
    }

    handleEditMovie =() => {
        console.log('edit the movie', this.state);
        //send the data to the server/database
        this.props.dispatch({ type: 'EDIT_LISTING', payload: {title: this.state.title, description: this.state.description, id: this.props.match.params.id}})

        //move teh used back to the details page
        this.props.history.push('/');
    }

    handleChange = name => event => {
        console.log(event.target);
        this.setState({ [name]: event.target.value,});
      };
    render() {
        console.log('details this props', this.props);
        const classes = this.props.classes;
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
                    color="secondary">Edit Movie
                </Button>
                </>

                <>
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
                        <MenuItem key={option.id} value={option.id}>
                        {option.name}
                        </MenuItem>
                        ))}
                </TextField>
                <Button 
                    variant="contained" 
                    onClick={this.handleEditGenre}
                    color="secondary">Edit Genre
                </Button>
                </>
                <Button 
                    variant="contained" 
                    onClick={this.goHome}
                    color="primary">Back To List
                </Button>

            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
});

export default connect(putReduxStateOnProps)(Edit);