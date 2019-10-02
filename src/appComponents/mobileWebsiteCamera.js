import React from 'react';
import Webcam from 'react-webcam';
import {Flash, Settings, Gallery, Back} from './elements';
import './mobileApp.css'
import { OCR, scrape } from '../backendHandling';
import Swipe from 'react-easy-swipe';

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
      output: 'vid',
      picture: require("./pictures/question.jpg"),
      selectedFile: null,
      gotQuestion: false,
      question: ''
    }
    this.OCR = this.OCR.bind(this);
    this.submit = this.submit.bind(this);
    this.capture = this.capture.bind(this);
    this.swipeUp = this.swipeUp.bind(this);
    this.swipeDown = this.swipeDown.bind(this);
    this.backClick = this.backClick.bind(this);
    this.inputText = this.inputText.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.showDefault = this.showDefault.bind(this);
    this.flipOutMode = this.flipOutMode.bind(this);
    this.changeTextBox = this.changeTextBox.bind(this);
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
    this.setState(() => ({ output: 'vid', gotQuestion: false, swipedUp: false }));
  }

  showAnswer(){
    this.props.changeState(this.state.question, this.state.answers, this.state.websites);
  }

  async OCR(){
    this.setState({isTextBox: false});
    let question = await OCR(this.state.picture);
    this.setState({ question: question, gotQuestion: true })
    let obj = await scrape(this.state.question);
    this.setState({ answers: obj.answers, websites: obj.websites})
  }

  swipeUp(){
    if (this.state.gotQuestion){return}
    this.setState({gotQuestion: true, isTextBox: true, output: 'img'});
  }

  swipeDown(){
    if (!this.state.gotQuestion){return}
    this.setState({gotQuestion: false, isTextBox: false});
  }

  inputText(e){
    this.setState({question: e.target.value});
  }

  async submit(e){
    if (e.key === 'Enter'){
      this.setState({isTextBox: false})
      let obj = await scrape(this.state.question);
      this.setState({ answers: obj.answers, websites: obj.websites})
      this.showAnswer()
    }
  }

  changeTextBox(){
    console.log('double-click');
    this.setState({isTextBox: !this.state.isTextBox});
  }

  render(){
    const func = this.state.output === 'vid' ? this.capture : this.OCR;
    const footerBottom = -(this.state.gotQuestion ? 3 : window.innerHeight / 25);
    return (
      <div className="App">
        <header className="nav" style={{height: Math.round(window.innerHeight/10)}}>
          {this.state.output === 'vid' ?
          <Flash />:
          <Back handleClick={this.backClick} />}
          <Settings showDefault={this.showDefault} />
          <Gallery selectFileHandle={this.selectFileHandle} />
        </header>
        <Swipe
          onSwipeUp={this.swipeUp}
          onSwipeDown={this.swipeDown}
        >
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
                {this.state.gotQuestion ?
                  (<div className="question" style={{borderRadius: window.innerWidth/50}} onClick={this.state.isTextBox ? null : this.showAnswer}>
                    {this.state.isTextBox ?
                    <input value={this.state.question} type="text" onChange={this.inputText} onKeyDown={this.submit} onDoubleClick={this.changeTextBox} />:
                    <p onDoubleClick={this.changeTextBox}>{this.state.question}</p>}
                  </div>)
                  : null
                }
            </footer>
          </div>
        </Swipe>
      </div>
    )
  }
};