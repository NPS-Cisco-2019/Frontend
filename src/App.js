import React from 'react';
import CompApp from './appComponents/compWebsite';
import MobileApp from './appComponents/mobileApp';
import { BrowserRouter } from 'react-router-dom';

let dev = true;

function App(){
  if (typeof window.orientation !== "undefined" || dev){
    return <BrowserRouter><MobileApp /></BrowserRouter>;
  } else {
    return <CompApp />;
  }
}

export default App;