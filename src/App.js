import React from 'react';
// import logo from './logo.svg';
import './App.css';
const selected = true;
let cls = 'nav-obj flash';
if (selected){
  cls += ' selected'
};

function App() {
  return (
    <div className="App">
      <div className="background">
        <header className="nav">
            <div className={cls}><img src={require("./flash.png")} alt="flash" className="nav-img" /></div>
            <div className="nav-obj settings"><img src={require("./settings.png")} alt="settings" className="nav-img" /></div>
            <div className="nav-obj gallery"><img src={require("./gallery.png")} alt="Gallery" className="nav-img" /></div>
        </header>
        <img src="https://i.redd.it/xcmltqxm69n31.jpg" alt="meme" className="center" />
        <footer>
            <div className="bar"></div>
        </footer>
      </div>
    </div>
  );
}

export default App;