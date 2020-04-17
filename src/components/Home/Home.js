import React, { Component } from 'react';
import Listing from '../Listing/Listing';

class Home extends Component {
    render() {
        console.log('home this props', this.props);
        return(
            <div>
                <h1>Home Page</h1>
                <p>here is where to show all the movies in some sort of list.
                    they have to be retrieved from te database. If you click on the picture,
                    it should send you to the details page with that ID (which will be a property of it)
                    I'll make a component each listing...
                </p>
                <Listing id='7' history={this.props.history}/>
            </div>
        )
    }
}

export default Home;