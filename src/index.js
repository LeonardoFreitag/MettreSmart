import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './routes';
console.disableYellowBox = true;

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import combReducers from './ReducersCombine';

let store = createStore(combReducers);

export default function App() {
    return (
        <>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <Provider store={store}>
                <Routes />
            </Provider>
        </>
    )
}