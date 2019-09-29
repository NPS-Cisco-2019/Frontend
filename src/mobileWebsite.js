import React from 'react';
import Webcam from 'react-webcam';
import {Flash, Settings, Gallery} from './elements';

function orientButton(){
  captureButtonStyle.left = 5*window.innerWidth/12;
  captureButtonStyle.width = window.innerWidth / 6;
  captureButtonStyle = window.innerWidth / 6;

  console.log(captureButtonStyle);
}

const imgStyle = {
  height: window.innerHeight,
  zIndex: '0',
  margin: 'auto'
};

const imgContainerStyle = {
  height: Math.round(9 * window.innerHeight / 10),
  backgroundColor: 'rgb(25,25,25)',
  display: 'flex',
  position: 'relative',
  top: Math.round(window.innerHeight/10)
};

let captureButtonStyle = {
  position: 'fixed',
  bottom: window.innerHeight / 10,
  borderRadius: '50%',
  width: window.innerWidth / 6,
  height: window.innerWidth / 6,
  zIndex: 42,
  backgroundColor: 'rgb(224, 0, 0)',
  border: '0.2em solid white',
  // jusifySelf: 'center'
  left: 5*window.innerWidth/12
};

const videoConstraints = {
  // facingMode: 'user',
  facingMode:  { exact: "environment" },
  height: window.innerWidth,
  width: window.innerHeight
};

export default class MobileApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      output: 'vid',
      picture: require("./pictures/question.jpg"),
      selectedFile: null
    }
    this.capture = this.capture.bind(this);
    this.showDefault = this.showDefault.bind(this);
    this.flipOutMode = this.flipOutMode.bind(this);
    this.selectFileHandle = this.selectFileHandle.bind(this);
    this.cameraErrorHandler = this.cameraErrorHandler.bind(this);
  }
  
  cameraErrorHandler(error){
    console.log(error);
    this.setState({ picture: require('./pictures/error.jpg'), output: 'img' });
  }

  showDefault(){
    this.setState({output: 'img', picture: require('./pictures/question.jpg')});
  }

  flipOutMode(mode){
    this.setState({output: mode});
  }

  selectFileHandle(e){
    const url = URL.createObjectURL(e.target.files[0]);
    this.setState({ picture: url, output: 'img'});
  }

  capture(){
    // const webcam = document.getElementById('camera');
    // console.log(webcam);
    const imageSrc = this.refs.webcam.getScreenshot();
    // const imageURL = URL.createObjectURL(imageSrc);
    // console.log(imageURL);
    this.setState({picture: imageSrc, output: 'img'});
  }

  componentDidMount(){
    window.addEventListener('orientationchange', orientButton);
  }

  componentWillUnmount(){
    window.removeEventListener('orientationchange', orientButton)
  }

  render(){
    const display = this.state.output === 'vid' ? 'inherit' : 'none';
    return (
      <div className="App">
        <header className="nav" style={{height: Math.round(window.innerHeight/10)}}>
          <Flash flipOutMode={this.flipOutMode} on={this.state.output === 'vid'} />
          <Settings showDefault={this.showDefault} />
          <Gallery selectFileHandle={this.selectFileHandle} />
        </header>
        <div style={imgContainerStyle}>{
          this.state.output === 'img' ?
          <img src={this.state.picture} alt="pic" style={imgStyle} id="image" /> :
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
        <button style={{...captureButtonStyle, display: display}} onClick={this.capture}></button>
        <footer>
            <div className="bar"></div>
        </footer>
      </div>
    )
  }
};