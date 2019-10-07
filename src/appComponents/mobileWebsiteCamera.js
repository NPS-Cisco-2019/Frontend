// SECTION imports
import React from 'react';
import Webcam from 'react-webcam';
import {Flash, Settings, Gallery, Back} from './elements';
import './mobileApp.css'
import { OCR, scrape } from '../backendHandling';
import Swipe from 'react-easy-swipe';
import { withRouter } from "react-router-dom";
// !SECTION

// SECTION Inline styles  

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
  borderRadius: '50%',
  width: maxLength,
  height: maxLength,
  zIndex: 42,
  backgroundColor: 'rgb(224, 0, 0)',
  border: '0.15em solid white',
  transition: 'bottom 100ms cubic-bezier(0.215, 0.61, 0.355, 1)'
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

// !SECTION 

class MobileAppPicture extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      output: 'vid',
      picture: require("./pictures/question.jpg"),
      selectedFile: null,
      footStyle: { backgroundColor: 'rgb(50, 50, 50)' },
      ansClicked: false,
      quesStyle: {},
      gotQuestion: false,
      question: 'what is love baby dont hurt me, dont hurt me, no more and then it continues coz its a long ass question that never ends?'
    }

    // SECTION function binding 
    this.OCR = this.OCR.bind(this);
    this.submit = this.submit.bind(this);
    this.capture = this.capture.bind(this);
    this.swipeUp = this.swipeUp.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.swipeDown = this.swipeDown.bind(this);
    this.backClick = this.backClick.bind(this);
    this.inputText = this.inputText.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.showDefault = this.showDefault.bind(this);
    this.flipOutMode = this.flipOutMode.bind(this);
    this.changeTextBox = this.changeTextBox.bind(this);
    this.selectFileHandle = this.selectFileHandle.bind(this);
    this.cameraErrorHandler = this.cameraErrorHandler.bind(this);
    // !SECTION 
  }
  
  /* SECTION FUNCTIONS */

  // handles error recieved by Webcam component
  cameraErrorHandler(error){
    console.log(error);
    this.setState({ picture: require('./pictures/error.jpg'), output: 'img' });
  }

  // TODO remove this, temporary until settings path programmed/removed
  showDefault(){
    let img = require('./pictures/default.jpg');
    this.setState({output: 'img', picture: img});
  }

  // changes whether picture or video is displayed
  flipOutMode(mode){
    this.setState({output: mode});
  }

  // sets state to include img seleced from gallery
  selectFileHandle(e){
    const url = URL.createObjectURL(e.target.files[0]);
    this.setState({ picture: url, output: 'img'});
  }

  // takes a picure and sets output mode
  capture(){
    const imageSrc = this.refs.webcam.getScreenshot();
    this.setState({picture: imageSrc, output: 'img'});
  }

  // SECTION Handles orientation change
  componentDidMount(){
    window.addEventListener('orientationchange', () => {this.forceUpdate();});
    this.setState({mounted: true});
  }

  componentWillUnmount(){
    window.removeEventListener('orientationchange', () => {this.forceUpdate();})
  }
  
  // !SECTION

  // handles change from image mode back to video
  backClick(){
    this.setState(() => ({ output: 'vid', gotQuestion: false, swipedUp: false }));
  }

  // Utilizes parent function to change Parent state
  showAnswer(){
    this.props.changeState(this.state.question, this.state.answers, this.state.websites);

    let questionHeight = document.getElementById('question').getBoundingClientRect().height;
    let top = window.innerHeight/11 + 1.4 * questionHeight / 100 + 4;

    this.setState({
      footStyle: {
        width: window.innerWidth,
        backgroundColor: 'rgb(25, 25, 25)',
        margin: 0,
        borderRadius: 0
      },
      quesStyle: {
        top: top,
        margin: 0,
        borderRadius: window.innerWidth / 50,
        padding: 10,
        position: 'absolute'
      },
      ansClicked: true
    })
    setTimeout(() => {
      this.props.history.push('./Answer')
    }, 600);
  }

  calculateBottom(){
    if (!this.state.gotQuestion || !this.state.mounted){
      return 3 * window.innerHeight / 20;
    }

    let foot = document.getElementById('foot').getBoundingClientRect();
    return Math.max(foot.height + 60, 3 * window.innerHeight / 20)
  }

  calculateHeight(){
    if (this.state.ansClicked){
      return window.innerHeight + 3;
    }

    if (!(this.state.gotQuestion && this.mounted)){
      return 20;
    }

    let cont = document.getElementById('quesCont').getBoundingClientRect();
    return 50 + cont.height;
  }

  // SECTION  handles backend calling

  /* if image is taken for proccesing */
  async OCR(){
    this.setState({isTextBox: false});
    let question = await OCR(this.state.picture);
    this.setState({ question: question, gotQuestion: true })
    let obj = await scrape(this.state.question);
    this.setState({ answers: obj.answers, websites: obj.websites})
  }
    
  /* if question is entered maually */
  async submit(e){
    if (e.key === 'Enter'){
      this.setState({isTextBox: false})
      let obj = await scrape(this.state.question);
      this.setState({ answers: obj.answers, websites: obj.websites})
      this.showAnswer();
    }
  }

  // !SECTION

  // SECTION handles manually pulling up bottom section
  swipeUp(){
    if (this.state.gotQuestion){return}
    this.setState({gotQuestion: true, isTextBox: true, output: 'img'});
  }

  swipeDown(){
    if (!this.state.gotQuestion){return}
    this.setState({gotQuestion: false, isTextBox: false});
  }
  // !SECTION

  inputText(e){
    this.setState({question: e.target.value});
  }

  changeTextBox(){
    this.setState({isTextBox: !this.state.isTextBox});
  }

  // SECTION Handles pressing of the question when it is shown
  touchStart(){
    setTimeout(() => {
      if (this.state.prevent){
        this.setState({longpress: true});
      }
    }, 300);
  }

  touchEnd(){
    if (!!this.state.longpress){
      this.changeTextBox();
    } else if (!this.state.isTextBox){
      this.submit({key: 'Enter'});
    }
    this.setState({longpress: false, prevent: true});
  }

  //!SECTION

  /* !SECTION */

  render(){
    const func = this.state.output === 'vid' ? this.capture : this.OCR;
    const footerBottom = -(this.state.gotQuestion ? 3 : window.innerHeight / 25);
    let bot = this.calculateBottom();
    return (
      <div className="App fadein" style={{minHeight: window.innerHeight}}>
        {/* SECTION  NAV */}
        <header className="nav" style={{height: Math.round(window.innerHeight/10)}}>
          {this.state.output === 'vid' ?
          <Flash />:
          <Back handleClick={this.backClick} />}
          <Settings showDefault={this.showDefault} />
          <Gallery selectFileHandle={this.selectFileHandle} />
        </header>
        {/* !SECTION */}
        <Swipe
          onSwipeUp={this.swipeUp}
          onSwipeDown={this.swipeDown}
        >
          <div>
            {/* SECTION Image/Video displayer */}
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
            {/* !SECTION */}
            {/* SECTION Capture/Process buttom\n */}
            <button style={{...captureButtonStyle, left: ((window.innerWidth - maxLength) / 2), bottom: bot}} onClick={func}>
              {this.state.output === 'img' ? <img className="searchImg" src={require('./pictures/search.png')} alt="search icon" /> : null}
            </button>
            {/* !SECTION */}
            {/* SECTION Bottom bar */}
            <footer style={{minHeight: Math.round(window.innerHeight/10),
                            bottom: footerBottom,
                            boxSizing: 'border-box',
                            ...this.state.footStyle,
                            height: this.calculateHeight() }} id="foot">
                {this.state.ansClicked ? null : <div className="bar"></div>}
                {/* Checks whether bar is up */}
                {this.state.gotQuestion ?
                  (<div className="info" id="quesCont"
                    style={{borderRadius: window.innerWidth/50,
                            width: 9*window.innerWidth/10,
                            boxSizing: 'border-box',
                            ...this.state.quesStyle}}
                    onTouchStart={this.touchStart}
                    onTouchEnd={this.touchEnd}
                  >
                    {this.state.isTextBox ?
                    <input value={this.state.question} type="text" onChange={this.inputText} onKeyDown={this.submit} /> :
                    <p id="question" style={{margin: 0, fontSize: 16}}>{this.state.question}</p>}
                    {this.mounted = true}
                  </div>)
                  : this.mounted = false
                }
            </footer>
            {/* !SECTION */}
          </div>
        </Swipe>
      </div>
    )
  }
};


export default withRouter(MobileAppPicture);