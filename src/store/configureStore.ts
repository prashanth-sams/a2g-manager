import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from 'redux-logger';
import thunk from "redux-thunk";
import biblelistReducer from "../reducers/biblelist";
import questiondetailsReducer from "../reducers/questiondetails";

export const rootReducer = combineReducers({
  biblelist: biblelistReducer,
  questiondetails: questiondetailsReducer
});

export const store = createStore(rootReducer, applyMiddleware(logger, thunk));