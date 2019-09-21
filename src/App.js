import React from 'react';
// import logo from './logo.svg';
import './App.css';
const selected = true;
let cls = '';
if (selected){
  cls += 'selected'
};

let maxLength = (10/100) * (50/100) * window.innerHeight;

const navObj = {
  'align-items': 'center',
  'justify-items': 'center',
  'padding': '10%',
  'height': maxLength,
  'border-radius': '50%',
  'width': maxLength
}
// className="nav-obj"

function App() {
  return (
    <div className="App">
      <div className="background">
        <header className="nav">
            <div className={cls} style={navObj}><img src={require("./flash.png")} alt="flash" className="nav-img" /></div>
            <div style={navObj}><img src={require("./settings.png")} alt="settings" className="nav-img" /></div>
            <div style={navObj}><img src={require("./gallery.png")} alt="Gallery" className="nav-img" /></div>
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