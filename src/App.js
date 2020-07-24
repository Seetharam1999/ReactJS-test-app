/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
//import logo from './logo.svg';
//import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import Main from './component/MainComponent';

class App extends Component{
  constructor(props){
    super(props);
   
  }
render(){
  return (
    <Main/>
  );
}
}

export default App;
