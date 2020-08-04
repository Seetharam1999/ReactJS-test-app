/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import { Provider }from 'react-redux';
import {ConfigureStore}from './redux/configureStore';
import Main from './component/MainComponent';

class App extends Component{
  
render(){
  const store=ConfigureStore()
  return (
    <Provider store={store}> 
     <BrowserRouter>
      <div >
        <Main/></div>
    </BrowserRouter>
    </Provider>
 
  );
}
}

export default App;
