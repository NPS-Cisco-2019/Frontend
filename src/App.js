import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Webcam from 'react-webcam';
// eslint-disable-next-line
import {Flash, Settings, Gallery, Firefox, Chrome, Safari, getBrowser, ErrorBoundary} from './elements';
let dev = true;

const highlightStyle = {
  position: 'absolute',
  borderBottom: '2px solid rgb(18, 218, 0)',
  transition: 'all 1s cubic-bezier(0.075, 0.82, 0.165, 1)'
}

const imgStyle = {
  height: window.innerHeight,
  zIndex: '0',
  margin: 'auto'
}

const imgContainerStyle = {
  height: Math.round(9 * window.innerHeight / 10),
  backgroundColor: 'rgb(25,25,25)',
  display: 'flex',
  position: 'relative',
  top: Math.round(window.innerHeight/10)
}

const captureButtonStyle = {
  position: 'fixed',
  top: 17 * window.innerHeight / 20,
  borderRadius: '50%',
  width: window.innerWidth / 6,
  height: window.innerWidth / 6,
  zIndex: 42,
  backgroundColor: 'rgb(35, 35, 35)',
  left: 5 * window.innerWidth / 12
}

const videoConstraints = {
  // facingMode: 'user',
  facingMode:  { exact: "environment" },
  height: window.innerWidth,
  width: window.innerHeight
};

class App extends React.Component {
  constructor(props){
    super(props);
    this.mobile = typeof window.orientation !== "undefined" || dev;
    const browser = getBrowser();
    this.state = {
      tutorial: this.getJsx(browser),
      browser: browser,
      chrome: {top:0, height:0, left:0, width:0},
      firefox: {top:0, height:0, left:0, width:0},
      safari: {top:0, height:0, left:0, width:0},
      output: 'vid',
      picture: require("./pictures/question.jpg"),
      selectedFile: null
    }
    this.capture = this.capture.bind(this);
    this.showDefault = this.showDefault.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.flipOutMode = this.flipOutMode.bind(this);
    this.calcHighlight = this.calcHighlight.bind(this);
    this.calcBrowserPos = this.calcBrowserPos.bind(this);
    this.selectFileHandle = this.selectFileHandle.bind(this);
    this.cameraErrorHandler = this.cameraErrorHandler.bind(this);
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

  capture(){
    // const webcam = document.getElementById('camera');
    // console.log(webcam);
    const imageSrc = this.refs.webcam.getScreenshot();
    // const imageURL = URL.createObjectURL(imageSrc);
    // console.log(imageURL);
    this.setState({picture: imageSrc, output: 'img'});
  }

  calcHighlight(browser){
    const obj = document.getElementById(browser).getBoundingClientRect();
    
    //WARNING THROWN HERE, BE CAREFUL
    // eslint-disable-next-line
    this.state[browser] = {
          top: Math.round(obj.top - 100),
          height: Math.round(obj.height),
          left: obj.left,
          width: Math.round(obj.width)
        }
  }

  handleClick(e){
    const browser = e.currentTarget.className;

    //Change tutorial
    let jsx = this.getJsx(browser);
    if (jsx){
      this.setState({ tutorial: jsx, browser: browser });
    }
  }
  
  selectFileHandle(e){
    const url = URL.createObjectURL(e.target.files[0]);
    this.setState({ picture: url, output: 'img'});
  }

  flipOutMode(mode){
    this.setState({output: mode});
  }

  showDefault(){
    this.setState({output: 'img', picture: require('./pictures/question.jpg')});
  }

  calcBrowserPos(){
    if (this.mobile){return}
    let l = ['chrome', 'firefox', 'safari'];
    for (let i = 0; i<3; i++){
        this.calcHighlight(l[i]);
    }
    this.forceUpdate();
  }

  cameraErrorHandler(error){
    console.log(error);
    this.setState({ picture: require('./pictures/error.jpg'), output: 'img' });
  }

  componentDidMount() {
    if (this.mobile){
      return
    }
    window.onscroll =()=>{
      this.setState({currentScrollHeight: window.scrollY})
    }
    this.calcBrowserPos();
    window.addEventListener('resize', this.calcBrowserPos);
  }

  componentWillUnmount() {
    if (this.mobile){return}
    window.removeEventListener('resize', this.calcBrowserPos);
  }

  render(){
    if (this.mobile){
      document.body.style = {backgroundColor: "rgb(25, 25, 25)", overflow: 'hidden'};
      return (
        <div className="App">
          <header className="nav" style={{height: Math.round(window.innerHeight/10)}}>
              <Flash flipOutMode={this.flipOutMode} />
              <Settings showDefault={this.showDefault} />
              <Gallery selectFileHandle={this.selectFileHandle} />
          </header>
          <div style={imgContainerStyle}>{
            this.state.output === 'img' ?
            <img src={this.state.picture} alt="pic" style={imgStyle} id="image" /> :
            // <Camera errorHandler={this.cameraErrorHandler} style={imgStyle} />
            <Webcam 
              audio={false}
              videoConstraints={videoConstraints}
              onUserMediaError={this.cameraErrorHandlerndler}
              style={imgStyle}
              screenshotFormat="image/jpeg"
              id="camera"
              ref='webcam'
            />
          }</div>
          <button style={captureButtonStyle} onClick={this.capture}></button>
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
            <div style={{...highlightStyle, ...this.state[this.state.browser]}}>{console.log(this.state.browser, this.state[''+this.state.browser])}</div>
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