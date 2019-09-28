import React from 'react';
import {Firefox, Chrome, Safari, getBrowser} from './elements';

const highlightStyle = {
  position: 'absolute',
  borderBottom: '2px solid rgb(18, 218, 0)',
  transition: 'all 1s cubic-bezier(0.075, 0.82, 0.165, 1)'
}
  
export default class CompApp extends React.Component {
  constructor(props){
    super(props);
    const browser = getBrowser();
    this.state = {
      tutorial: this.getJsx(browser),
      browser: browser,
      chrome: {top:0, height:0, left:0, width:0},
      firefox: {top:0, height:0, left:0, width:0},
      safari: {top:0, height:0, left:0, width:0},
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
      return <Firefox />;
    } else if (browser === 'chrome'){
      return <Chrome />;
    } else if (browser === 'safari'){
      return <Safari />;
    }
  }

  calcHighlight(browser){
    const obj = document.getElementById(browser).getBoundingClientRect();
    
    //WARNING THROWN HERE, BE CAREFUL
    // eslint-disable-next-line
    this.state[browser] = {
          top: Math.round(obj.top - this.state.headHeight),
          height: Math.round(obj.height),
          left: obj.left,
          width: Math.round(obj.width)
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
    let l = ['chrome', 'firefox', 'safari'];
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
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calcBrowserPos);
  }

  render(){
    let opacity = Math.max(Math.min(100 / this.state.currentScrollHeight  , 1), 0.7);
    return(
      <div className="App deskApp">
        <header className="deskHead" style={{opacity: opacity}} id="head">
          <h1>This app is not supported on Computers</h1>
        </header>
        <div className="body" style={{top: this.state.headHeight}}>
          <div className="description">
            <div style={{...highlightStyle, ...this.state[this.state.browser]}}></div>
            <p style={{fontSize: "1.3em", marginBottom: 30, textAlign: "center"}}><i>Insert name here</i> is a problem solving app, just take a picture and the app automatically scans the web to find the best answers for you.(this is temporary and not complete)</p>
            <h2>Go to your mobile phone in one of the following browsers and follow these tutorials to install it.</h2>
            <div className="logos">
              <button className="firefox" onClick={this.handleClick}><img className="desk img" id="Firefox" src={require("./pictures/firefox.png")} alt="firefox" /></button>
              <label htmlFor="Firefox" id="firefox">Firefox</label>
              
              <button className="chrome" onClick={this.handleClick}><img className="desk img" id="Chrome" src={require("./pictures/chrome.png")} alt="chrome"/></button>
              <label htmlFor="Chrome" id="chrome">Chrome</label>
              
              <button className="safari" onClick={this.handleClick}><img className="desk img" id="Safari" src={require("./pictures/safari.png")} alt="safari"/></button>
              <label htmlFor="Safari" id="safari">Safari</label>
            </div>
          </div>
          <div style={{overflow: 'hidden', marginTop: 30}}>
            {this.state.tutorial}
          </div>
        </div>
      </div>
    )
  }
}