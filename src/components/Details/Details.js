import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { connect } from 'react-redux';



class Details extends Component {

    state = {
        movie: {}
    }

    componentDidMount() {
        console.log('component mounted');
        this.props.dispatch({ type: 'GET_DETAILS', payload: this.props.match.params.id});
        this.props.dispatch({ type: 'GET_GENRES', payload: this.props.match.params.id});
        

    }

    goHome = (event) => {
        console.log('you are headed home');
        this.props.history.push('/');
    }

    handleEdit = (event) => {
        console.log('you are going to edit');
        this.props.history.push(`/edit/${this.props.match.params.id}`)
    }
    render() {
        console.log('details this props', this.props);
        return(
            <div>
                <div>
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