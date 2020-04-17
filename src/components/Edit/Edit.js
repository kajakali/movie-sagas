import React, { Component } from 'react';
import Button from '@material-ui/core/Button';





class Edit extends Component {

    goHome = (event) => {
        console.log('you are headed home');
        this.props.history.push('/');
    }
    handleEdit = () => {
        console.log('handle the edit here');
    }

    render() {
        console.log('details this props', this.props);
        return(
            <div>
                <h2>Edit</h2>
                <p>The `match` prop is: {JSON.stringify(this.props.match)}</p>
                <p>This is the edit page for item with id {this.props.match.params.id}!</p>
                <Button 
                    variant="raised" 
                    onClick={this.goHome}
                    color="primary">Home</Button>
                <Button 
                    variant="raised" 
                    onClick={this.handleEdit}
                    color="secondary">Edit</Button>
            </div>
        )
    }
}

export default Edit;