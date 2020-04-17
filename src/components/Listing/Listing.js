import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const styles = {
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };

class Listing extends Component {
  
    handleClick = () => {
        console.log('you clicked on a movie!', this.props.id);
        this.props.history.push(`/details/${this.props.id}`)
    }

    render() {
        console.log('listing props, ', this.props);
      const {classes} = this.props;
      return (
        <div >
            <p>
                here's where I'll put the movie poster and the text based on the this.props.id
                it needs an onClick that goes to the details page
                I could make it a card...
            </p>
            <Card onClick={this.handleClick}>
                <CardContent>
                    <img src='./images/avatar.jpeg' />
                    <Typography>
                        Avatar
                    </Typography>
                </CardContent>
            </Card>
        </div>
      );
    }
  }
  
  export default Listing;
  