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
}

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

function* addListingGenre(action) {
    try {
        const addGenreResponse = yield axios.put(`/genres/${action.payload.id}`, {data: action.payload});
        console.log('add genres response', addGenreResponse);
        this.props.dispatch({ type: 'FETCH_MOVIES'});
    }
    catch (error) {
        console.log('error in add genre to listing saga', error)
    }
}

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

const details = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}
// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}
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
