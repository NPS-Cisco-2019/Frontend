import React from 'react';
import CompApp from './appComponents/compWebsite';
import MobileApp from './appComponents/mobileApp';

let dev = true;

function App(){
  if (typeof window.orientation !== "undefined" || dev){
    return <MobileApp />;
  } else {
    return <CompApp />;
  }
}

export default App;