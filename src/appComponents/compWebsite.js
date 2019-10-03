import React from 'react';
import {Firefox, Chrome, Safari, getBrowser} from './elements';
import './desktopApp.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

const highlightStyle = {
  position: 'absolute',
  borderBottomStyle: 'solid',
  borderBottomWidth: 2,
  transition:  'all 1500ms cubic-bezier(0.075, 0.82, 0.165, 1), border-bottom-color 1500ms cubic-bezier(0.645, 0.045, 0.355, 1), width 1500ms linear'
}
  
export default class CompApp extends React.Component {
  constructor(props){
    super(props);
    const browser = getBrowser();
    this.defaultTutorial = this.getJsx(browser);
    console.log({br: browser, tut: this.defaultTutorial})
    this.state = {
      tutorial: this.getJsx(browser),
      browser: browser,
      firefox: { top:0, height:0, left:0, width:0, borderBottomColor: 'rgb(200, 0, 0)' },
      chrome: { top:0, height:0, left:0, width:0, borderBottomColor: 'rgb(18, 218, 0)' },
      safari: { top:0, height:0, left:0, width:0, borderBottomColor: 'rgb(0, 0, 255)' },
      headHeight: 0,
      currentScrollHeight: 0
    }
    
    this.handleClick = this.handleClick.bind(this);
    this.calcHighlight = this.calcHighlight.bind(this);
    this.calcBrowserPos = this.calcBrowserPos.bind(this);
    this.changeHeadHeight = this.changeHeadHeight.bind(this);
  }

  getJsx(browser){
    if (browser === 'firefox'){
      return Firefox;
    } else if (browser === 'chrome'){
      return Chrome;
    } else if (browser === 'safari'){
      return Safari;
    }
  }

  calcHighlight(browser){
    const obj = document.getElementById(browser).getBoundingClientRect();

    let top;
    
    if (browser !== 'firefox'){
      top = this.state.firefox.top;
    } else {
      top = Math.round(obj.top - this.state.headHeight);
    }
    //WARNING THROWN HERE, BE CAREFUL
    // eslint-disable-next-line
    this.state[browser] = {
          top: top,
          height: Math.round(obj.height),
          left: obj.left,
          width: Math.round(obj.width),
          borderBottomColor: this.state[browser].borderBottomColor
        }
  }

  changeHeadHeight(){
    const head = document.getElementById('head');
    this.setState({headHeight: head.clientHeight});
  }

  handleClick(e){
    const browser = e.currentTarget.className;
    
    //Change tutorial
    let jsx = this.getJsx(browser);
    
    if (jsx){
      this.setState({ tutorial: jsx, browser: browser });
    }
  }

  calcBrowserPos(){
    let l = ['firefox', 'chrome', 'safari'];
    for (let i = 0; i<3; i++){
        this.calcHighlight(l[i]);
    }
    this.forceUpdate();
  }

  componentDidMount() {
    window.onscroll =()=>{
      this.setState({currentScrollHeight: window.scrollY})
    }
    this.calcBrowserPos();
    this.changeHeadHeight();
    window.addEventListener('resize', this.calcBrowserPos);
    window.addEventListener('resize', this.changeHeadHeight);
    this.forceUpdate();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calcBrowserPos);
    window.addEventListener('resize', this.changeHeadHeight);
  }

  render(){
    let opacity = Math.max(Math.min(50 / this.state.currentScrollHeight  , 1), 0.7);
    return(
      <BrowserRouter>
        <div className="App deskApp">
          <header className="deskHead" style={{opacity: opacity}} id="head">
            <h1>This app is not supported on Computers</h1>
          </header>
          <div className="body" style={{top: this.state.headHeight}}>
            <div className="description">
              <div style={{...highlightStyle, ...this.state[this.state.browser]}}></div>
              <p style={{fontSize: "1.3em", marginBottom: 30, textAlign: "center"}}>Insert name here is a problem solving app, just take a picture and the app automatically scans the web to find the best answers for you.(this is temporary and not complete). Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <h2>Go to your mobile phone in one of the following browsers and follow these tutorials to install it.</h2>
              <div className="logos">
                <Link to="./Firefox">
                  <button className="firefox" onClick={this.handleClick}>
                    <img className="desk img" id="Firefox" src={require("./pictures/firefox.png")} alt="firefox" />
                    <label htmlFor="Firefox" id="firefox">Firefox</label>
                  </button>
                </Link>
                <Link to="./Chrome">
                  <button className="chrome" onClick={this.handleClick}>
                    <img className="desk img" id="Chrome" src={require("./pictures/chrome.png")} alt="chrome"/>
                    <label htmlFor="Chrome" id="chrome">Chrome</label>
                  </button>
                </Link>
                <Link to="./Safari">
                  <button className="safari" onClick={this.handleClick}>
                    <img className="desk img" id="Safari" src={require("./pictures/safari.png")} alt="safari"/>
                    <label htmlFor="Safari" id="safari">Safari</label>
                  </button>
                </Link>
              </div>
            </div>
            <div style={{overflow: 'hidden', marginTop: 30}}>
                <Switch>
                  <Route path="/Firefox" component={Firefox} />
                  <Route path="/Chrome" component={Chrome} />
                  <Route path="/Safari" component={Safari} />
                  <Route path="/" component={this.defaultTutorial} />
                </Switch>
              {/* {this.state.tutorial} */}
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}