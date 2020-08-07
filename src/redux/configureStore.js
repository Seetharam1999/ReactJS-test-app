import {combineReducers, createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createForms}from 'react-redux-form'  
import {Comments}from './Comments';

import{Dishes}from './Dishes'
import{Leaders}from './Leaders';
import {Promotions}from './Promotions';
import { InitialFeedback } from './forms';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
           
            ...createForms({feedback:InitialFeedback})
        }),applyMiddleware(thunk,logger)
        );

    return store;
}