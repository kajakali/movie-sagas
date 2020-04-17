import Button from '@material-ui/core/Button';
import React, { Component } from 'react';



class Details extends Component {

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
                    <p>The `match` prop is: {JSON.stringify(this.props.match)}</p>
                    <p>This is the details page for item with id {this.props.match.params.id}!</p>
                  </div>
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

export default (Details);