import React from 'react';
import Webcam from 'react-webcam';
import {Flash, Settings, Gallery, Back} from './elements';
import './mobileApp.css'
import { OCR } from '../backendHandling';

const maxLength = (10/100) * (69/100) * window.innerHeight;

const imgStyle = {
  height: window.innerHeight,
  zIndex: '0',
  margin: 'auto'
};

const imgContainerStyle = {
  backgroundColor: 'rgb(25,25,25)',
  display: 'flex',
  position: 'relative'
};

const captureButtonStyle = {
  position: 'fixed',
  bottom: 3 * window.innerHeight / 20,
  borderRadius: '50%',
  width: maxLength,
  height: maxLength,
  zIndex: 42,
  backgroundColor: 'rgb(224, 0, 0)',
  border: '0.15em solid white',
  // display: 'flex',
  // justifyItems: 'center',
  // alignItems: 'center'
};

const videoConstraints = {
  // facingMode: 'user',
  facingMode:  { exact: "environment" },
  height: window.innerWidth,
  width: window.innerHeight
};

export default class MobileAppPicture extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      output: 'img',
      picture: require("./pictures/question.jpg"),
      selectedFile: null,
      gotQuestion: false,
      question: 'QUESTION IS HERE: kuyfgquy ahf bq  UBQJB  QIUHJU igwfuief efuwqfw'
    }
    this.capture = this.capture.bind(this);
    this.backClick = this.backClick.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
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
    let img = require('./pictures/default.jpg');
    this.setState({output: 'img', picture: img});
  }

  flipOutMode(mode){
    this.setState({output: mode});
  }

  selectFileHandle(e){
    const url = URL.createObjectURL(e.target.files[0]);
    this.setState({ picture: url, output: 'img'});
  }

  capture(){
    const imageSrc = this.refs.webcam.getScreenshot();
    this.setState({picture: imageSrc, output: 'img'});
  }

  componentDidMount(){
    window.addEventListener('orientationchange', () => {this.forceUpdate();});
  }

  componentWillUnmount(){
    window.removeEventListener('orientationchange', () => {this.forceUpdate();})
  }

  backClick(){
    this.setState(() => ({ output: 'vid' }));
  }

  showAnswer(){
    this.props.changeState(this.question, 'TODO, add answer calling', 'some website');
  }

  render(){
    const func = this.state.output === 'vid' ? this.capture : OCR;
    const question = this.state.output === 'img' ? true : false;
    const footerBottom = -(question ? 3 : window.innerHeight / 25);
    return (
      <div className="App">
        <header className="nav" style={{height: Math.round(window.innerHeight/10)}}>
          {this.state.output === 'vid' ?
          <Flash flipOutMode={this.flipOutMode} on={this.state.output === 'vid'} />:
          <Back handleClick={this.backClick} />}
          <Settings showDefault={this.showDefault} />
          <Gallery selectFileHandle={this.selectFileHandle} />
        </header>
        <div>
          <div style={{...imgContainerStyle, height: Math.round(9 * window.innerHeight / 10), top: Math.round(window.innerHeight/10)}}>{
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
          <button style={{...captureButtonStyle, left: ((window.innerWidth - maxLength) / 2)}} onClick={func}>
            {this.state.output === 'img' ? <img className="searchImg" src={require('./pictures/search.png')} alt="search icon" /> : null}
          </button>
          <footer style={{minHeight: Math.round(window.innerHeight/10), bottom: footerBottom, boxSizing: 'border-box' }}>
              <div className="bar"></div>
              {/*this.state.gotQuestion*/ question ?
                (<div className="question" style={{borderRadius: window.innerWidth/50}} onClick={this.showAnswer}>
                  <p>{this.state.question}</p>
                </div>) : null
              }
          </footer>
        </div>
      </div>
    )
  }
};