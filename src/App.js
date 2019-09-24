import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Flash, Settings, Gallery, Firefox, Chrome, Safari, getBrowser} from './elements';

const highlightStyle = {
  position: 'absolute',
  borderBottom: '2px solid rgb(18, 218, 0)',
  transition: 'all 1s cubic-bezier(0.075, 0.82, 0.165, 1)'
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.mobile = typeof window.orientation !== "undefined";
    const browser = getBrowser();
    this.state = {
      tutorial: this.getJsx(browser),
      browser: browser,
      highlight: {
        top: 0,
        height: 0,
      },
      left: 0,
      width: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }

  getJsx(browser){
    if (browser === 'firefox'){
      return <Firefox />;
    } else if (browser === 'chrome'){
      return <Chrome />;
    } else if (browser === 'safari'){
      return <Safari />;
    }
  }

  moveHighlight(browser){
    const obj = document.getElementById(browser).getBoundingClientRect();
    this.setState({
      highlight: {
        top: Math.round(obj.top - 100),
        height: Math.round(obj.height)
      },
      left: obj.left,
      width: Math.round(obj.width)
    });
  }

  handleClick(e){
    const browser = e.currentTarget.className;

    //Change tutorial
    let jsx = this.getJsx(browser);
    if (jsx){
      this.setState({ tutorial: jsx, browser: browser });
    }
    this.moveHighlight(browser);
  }

  componentDidMount () {
    if (this.mobile){return}  
    window.onscroll =()=>{
      this.setState({currentScrollHeight: window.scrollY})
   }
   this.moveHighlight(this.state.browser);
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
      document.body.style = { overflow: 'scroll' };
      let opacity = Math.max(Math.min(100 / this.state.currentScrollHeight  , 1), 0.7);
      return (
        <div className="App deskApp">
          <header className="deskHead" style={{opacity: opacity}}>
            <h1>This app is not supported on Computers</h1>
          </header>
          <div className="body">
            <div style={{...highlightStyle, ...this.state.highlight,left: this.state.left, width: this.state.width}}></div>
            <h2>Go to your mobile phone in one of the following browsers.</h2>
            <div className="logos">
              <button className="firefox" onClick={this.handleClick}><img className="desk img" id="Firefox" src={require("./pictures/firefox.png")} alt="firefox" /></button>
              <label htmlFor="Firefox" id="firefox">Firefox</label>
              
              <button className="chrome" onClick={this.handleClick}><img className="desk img" id="Chrome" src={require("./pictures/chrome.png")} alt="chrome"/></button>
              <label htmlFor="Chrome" id="chrome">Chrome</label>
              
              <button className="safari" onClick={this.handleClick}><img className="desk img" id="Safari" src={require("./pictures/safari.png")} alt="safari"/></button>
              <label htmlFor="Safari" id="safari">Safari</label>
            </div>
            {this.state.tutorial}
          </div>
        </div>
      );
    }
  }
}

export default App;