const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/', (req, res) => {
    console.log('in get route');
    const sqlText = `SELECT * FROM "movies";`;
    pool.query(sqlText).then( (result) => { 
        console.log('got data from database', result);
        res.send(result.rows);}
    ).catch( (error) => {
        console.log('error making database query', sqlText, error);
    });
});

module.exports = router;