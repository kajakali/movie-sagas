const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');



router.get('/:id', (req, res) => {
    console.log('in get genres', req.params.id);
    //query the database for the thing with that ID.
    const sqlText = `SELECT "genres"."id", "name" FROM "movies" 
    JOIN "movies_genres" ON "movies"."id" = "movies_genres"."movie_id" 
    JOIN "genres" ON "movies_genres"."genre_id" = "genres"."id"
    WHERE "movies"."id" = $1;`;
    pool.query(sqlText, [req.params.id]).then( (result) => {
        console.log('got data from database', result.rows);
        res.send(result.rows);
    }).catch( (error) => {
        console.log('error making database query', sqlText, error);
        res.sendStatus(500);
    });

})
router.put('/:id', (req, res) => {
    console.log('put function info', req.params.id, req.body.data.selectedGenre);
    const sqlText = 'INSERT INTO "movies_genres" ("movie_id", "genre_id") VALUES ($1, $2);';
    pool.query(sqlText, [req.params.id, req.body.data.selectedGenre]).then( (result) => {
        res.sendStatus(200);
    }).catch( (error) => {
        console.log('error adding genre to database', error);
        res.sendStatus(500);
    });
})
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM "genres";`;
    pool.query(sqlText).then( (result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch( (error) => {
        console.log('error', error);
        res.sendStatus(500);
    });
})
module.exports = router;