import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { connect } from 'react-redux';



class Details extends Component {

    state = {
        movie: {}
    }

    componentDidMount() {
        // whenever you create this page, it gets the associated details and genres 
        //based on the id of the page that you got when you clicked on the listing
        this.props.dispatch({ type: 'GET_DETAILS', payload: this.props.match.params.id});
        this.props.dispatch({ type: 'GET_GENRES', payload: this.props.match.params.id});
        

    }

    goHome = (event) => {
        // the Back to List button takes you to '/'
        console.log('you are headed home');
        this.props.history.push('/');
    }

    handleEdit = (event) => {
        // the edit button takes you to the edit page for the id of the listing
        console.log('you are going to edit');
        this.props.history.push(`/edit/${this.props.match.params.id}`)
    }
    render() {
        return(
            <div>
                <div>
                    {/*There's only one item in the details reducer but
                    it's inside an array, hence the map. The genres reducer could have
                    any number of items inside */}
                    <h2>Details</h2>
                    {this.props.reduxState.details.map( item => 
                    (<>
                    <img src={item.poster} alt={item.title} />
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    </>))}
                    <ul>
                    {this.props.reduxState.genres.map( item => <li key={item.id}>{item.name}</li>)}
                    </ul>
                </div>
                <Button 
                    variant="contained" 
                    onClick={this.goHome}
                    color="primary">Back to List</Button>
                <Button 
                    variant="contained" 
                    onClick={this.handleEdit}
                    color="secondary">Edit</Button>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
});

export default connect(putReduxStateOnProps)(Details);