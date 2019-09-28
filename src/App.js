import React from 'react';
import './App.css';
import MobileApp from './mobileWebsite';
import CompApp from './compWebsite';

let dev = true;

function App(){
  if (typeof window.orientation !== "undefined" || dev){
    document.body.style = {backgroundColor: "rgb(25, 25, 25)", overflow: 'hidden'};
    return (<MobileApp />);
  } else {
    document.body.style = { overflow: 'scroll' };
    return (<CompApp />);
  }
}

export default App;