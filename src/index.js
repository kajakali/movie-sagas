import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { takeEvery, takeLatest, put } from 'redux-saga/effects';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import axios from'axios';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchMovies);
    yield takeEvery('GET_DETAILS', getDetails);
    yield takeEvery('GET_GENRES', getGenres);
    yield takeEvery('GET_ALL_GENRES', getAllGenres);
    yield takeEvery('ADD_LISTING_GENRE', addListingGenre);
    yield takeEvery('EDIT_LISTING', editListing);
}
// fetchMovies gets the movies from the database and then uses set movies to put them
// in the movies reducer
function* fetchMovies() {
    try {
        const moviesResponse = yield axios.get('/movies');
        console.log('movies response was', moviesResponse);
        yield put({ type: 'SET_MOVIES', payload: moviesResponse.data});
    }
    catch (error) {
        console.log('error in getting the movies from the database with saga', error);
    }
}

// getDetails gets details about a specific movie based on the id in the details page
// and puts them in the details reducer so that the details page can use them
function* getDetails(action) {
    try {
        const  detailsResponse = yield axios.get(`/movies/details/${action.payload}`);
        console.log('details response', detailsResponse);
        yield put({ type: 'SET_DETAILS', payload: detailsResponse.data});
    }
    catch (error) {
        console.log('error in movie detail saga')
    }
}

// getGenres gets the genres that are associated with the movie through the junction table
// and puts them on the genres reducer so that they can be displayed on the details page
function* getGenres(action) {
    try {
        const  genresResponse = yield axios.get(`/genres/${action.payload}`);
        console.log('genres response', genresResponse);
        yield put({ type: 'SET_GENRES', payload: genresResponse.data});
    }
    catch (error) {
        console.log('error in movie genre saga');
    }
}

//addListingGenre gets the new genre and the id of the listing that's going to have a genre added
// and sends it to the database to make a new line on the junction table
function* addListingGenre(action) {
    try {
        const addGenreResponse = yield axios.put(`/genres/${action.payload.id}`, {data: action.payload});
        console.log('add genres response', addGenreResponse);
        yield this.props.dispatch({ type: 'FETCH_MOVIES'});
    }
    catch (error) {
        console.log('error in add genre to listing saga', error)
    }
}

//editListing gets the new title and description from the text areas on the edit page and
//sends them to the database to update the movies table
function* editListing(action) {
    try {
        const editListingResponse = yield axios.put(`/movies`, {data: action.payload});
        console.log('edit movies response', editListingResponse)
        yield this.props.dispatch({ type: 'GET_DETAILS'});
    }
    catch (error) {
        console.log('error in editing listing saga', error)
    }
}
// getGenres gets the genres that already are in use in the database and puts them in the
// allGenres reducer so that the edit page knows what genres you should be allowed to use
function* getAllGenres() {
    try {
        const allGenresResponse = yield axios.get(`genres`);
        yield put({ type: 'SET_ALL_GENRES', payload: allGenresResponse.data});
    }
    catch (error) {
        console.log('error in getting all the genres', error)
    }
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();



// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}
// stores the details of the current listing for use on details page (and could be used on edit
//page eventually, too)
const details = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}
// Used to store the movie genres associated with a particular listing
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

//used to store all the genres currently used in the whole database so that the
// edit page knows which genres to allow as new genres
const allGenres = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_GENRES':
            return action.payload;
        default:
            return state;
    }
}
// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details,
        allGenres
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
