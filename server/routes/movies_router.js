const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// this is to get all the movies in the movies table
router.get('/', (req, res) => {
    console.log('in get route');
    const sqlText = `SELECT * FROM "movies";`;
    pool.query(sqlText).then( (result) => { 
        console.log('got data from database', result);
        res.send(result.rows);
    }).catch( (error) => {
        console.log('error making database query', sqlText, error);
        res.sendStatus(500);
    });
});

// this is to get all the information about one movie in the movies table
router.get('/details/:id', (req, res) => {
    console.log('in get details', req.params.id);
    //query the database for the thing with that ID.
    const sqlText = `SELECT * FROM "movies" WHERE "id" = $1;`;
    pool.query(sqlText, [req.params.id]).then( (result) => {
        console.log('got data from database', result.rows);
        res.send(result.rows);
    }).catch( (error) => {
        console.log('error making database query', sqlText, error);
        res.sendStatus(500);
    });

})

// this is to update the title and description of the movie from the edit page
router.put('/', (req, res) => {
    console.log('movies put function info', req.body.data);
    const sqlText = `UPDATE "movies" SET "title" = $2, "description" = $3  WHERE "id" = $1;`;
    pool.query(sqlText, [req.body.data.id, req.body.data.title, req.body.data.description]).then( (result) => {
        res.sendStatus(200);
    }).catch( (error) => {
        console.log('error editing movie in database', error);
        res.sendStatus(500);
    });
});


module.exports = router;