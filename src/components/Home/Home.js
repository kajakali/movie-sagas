import React, { Component } from 'react';
import Listing from '../Listing/Listing';
import { connect } from 'react-redux';

class Home extends Component {
    componentDidMount(){
        // get the movies from the database whenever you want to display the list of movies
        this.props.dispatch({ type: 'FETCH_MOVIES'});
    }
    render() {
        console.log('home this props', this.props);
        return(
            <div>
                <h1>Home Page</h1>
                <ul>
                    {this.props.reduxState.movies.map((item) => 
                        <Listing 
                        key={item.id} 
                        id={item.id} 
                        title={item.title} 
                        poster={item.poster}
                        description={item.description}
                        history={this.props.history}/>
                    )}
                </ul>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
});

export default connect(putReduxStateOnProps)(Home);