import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';
import { connect } from 'react-redux';


const styles = {
    card: {
      minWidth: 275,
      maxWidth: 500,
    },
    title: {
      fontSize: 14,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        marginTop:30
      },
    pos: {
      marginBottom: 12,
    },
  };

class Listing extends Component {
  
    handleClick = () => {
        console.log('you clicked on a movie!', this.props.id);
        this.props.history.push(`/details/${this.props.id}`);
    }

    render() {
        const classes = this.props.classes;
      return (
            <Card className={classes.card}
                onClick={this.handleClick}>

                    <img src={this.props.poster} alt={this.props.title}/>

                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {this.props.title}
                </Typography>
                <Typography component="p">
                    {this.props.description}
                </Typography>
                </CardContent>
            </Card>
      );
    }
  }
  Listing.propTypes = {
      classes: PropTypes.object.isRequired,
  };
  
  export default connect()(withStyles(styles)(Listing));
  