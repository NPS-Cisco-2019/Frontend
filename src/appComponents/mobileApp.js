import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import MobileAppPicture from './mobileWebsiteCamera';
import MobileAppAnswer from './mobileWebsiteAnswer';
import testDetails from '../test';
import Unknown from './404';
import SettingsPage from './settings';
import Tutorial from './mobileTutorial';
import { changeMode } from '../localStorageHandleing';

// ANCHOR Main Mobile App that renders various mobile pages
// NOTE gets called by <App />, does not render by itself

let style = document.documentElement.style;


let highlightColor = localStorage.getItem('highlightCol');
if (highlightColor === null){
  localStorage.setItem('highlightCol', 'rgb(50, 90, 245)');
  highlightColor = 'rgb(50, 90, 245)';
}

let pressDelay = localStorage.getItem('pressDelay');
if (pressDelay === null){
  localStorage.setItem('pressDelay', '300')
}

let mode = localStorage.getItem('mode');
if (mode === null){
  localStorage.setItem('mode', 'dark');
  mode = 'dark'
}

changeMode(mode);

style.setProperty('--highlightCol', highlightColor)

document.getElementById('root').style.backgroundColor = 'var(--backCol)';

class MobileApp extends React.Component {
  constructor(props){
    super(props);
    // TODO change question, answer and website to inlclude integration
    this.state = {
      question: testDetails.question,
      answers: testDetails.answers,
      websites: testDetails.websites,
      backToCam: false
    }

    setTimeout(() => { this.started = true; },100);
    this.changeState = this.changeState.bind(this);
    this.changeDisplayAnswer = this.changeDisplayAnswer.bind(this);

    // TODO set to only /Picture after developement complete
    this.props.history.push(false ? '/Answer' : '/Picture' );
    // this.props.history.push('/Settings');
  }

  // Passed to child <MobileAppPicture /> to allow it to change the Parent state to show answer
  changeState(question, answers, websites){
    this.setState({question: question, answers: answers, websites: websites});
  }

  // Passed to child <MobileAnswerApp /> to allow it to change the Parent state to show picture mode
  changeDisplayAnswer(){
    this.setState({ backToCam: true });
    setTimeout(() => {
      this.setState({backToCam: false});
      this.props.history.push('/Picture');
    }, 500);
  }

  render(){
    return (
      <div>
        <Switch>
          <Route path="/Answer" render={() => (
            <MobileAppAnswer question={this.state.question} answers={this.state.answers} websites={this.state.websites} backClick={this.changeDisplayAnswer} />
          )} />
          
          <Route path="/Picture" render={() => (
            <MobileAppPicture changeState={this.changeState} />
          )} />

          <Route path="/Settings" render={() => (
            <SettingsPage backClick={this.changeDisplayAnswer} />
            )} />

          <Route path="/Tutorial" render={() => (
            <Tutorial backClick={this.changeDisplayAnswer} />
          )} />
            
          <Route path="/Unknown" component={Unknown} />

          {this.started ? <Route path="*" render={() => (<Redirect to="/Unknown" />)} /> : null}
        </Switch>
        {
          !this.state.backToCam ? null :
          <MobileAppPicture changeState={this.changeState} backToCam={true} />
        }
      </div>
    );
  }
}


export default withRouter(MobileApp);