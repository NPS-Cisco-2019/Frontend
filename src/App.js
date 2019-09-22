import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Flash, Settings, Gallery, Firefox, Chrome, Safari} from './elements';

class App extends React.Component {
  constructor(props){
    super(props);
    this.mobile = typeof window.orientation !== "undefined";
    this.state = {tutorial: <Chrome />}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    const browser = e.currentTarget.className;
    let jsx;
    if (browser === 'firefox'){
      jsx = <Firefox />;
    } else if (browser === 'chrome'){
      jsx = <Chrome />;
    } else if (browser === 'safari'){
      jsx = <Safari />;
    }
    if (jsx){
      this.setState({ tutorial: jsx });
    }
  }

  render(){
    if (this.mobile){
      return (
        <div className="App">
          <header className="nav">
              <Flash />
              <Settings />
              <Gallery />
          </header>
          <img src="https://i.redd.it/xcmltqxm69n31.jpg" alt="meme" className="center" />
          <footer>
              <div className="bar"></div>
          </footer>
        </div>
      );
    } else {
      return (
        <div className="App deskApp">
          <header className="deskHead">
            <h1>This app is not supported on Computers</h1>
          </header>
          <div className="body">
            <h3>Go to your mobile phone in one of the following browsers.</h3>
            <div className="logos">
              <button className="firefox" onClick={this.handleClick}><img className="desk img" id="Firefox" src={require("./pictures/firefox.png")} alt="firefox" /></button>
              <label htmlFor="Firefox">Firefox</label>
              
              <button className="chrome" onClick={this.handleClick}><img className="desk img" id="Chrome" src={require("./pictures/chrome.png")} alt="chrome"/></button>
              <label htmlFor="Chrome">Chrome</label>
              
              <button className="safari" onClick={this.handleClick}><img className="desk img" id="Safari" src={require("./pictures/safari.png")} alt="safari"/></button>
              <label htmlFor="Safari">Safari</label>
            </div>
            {this.state.tutorial}
          </div>
        </div>
      );
    }
  }
}

export default App;