import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import MobileAppPicture from './mobileWebsiteCamera';
import MobileAppAnswer from './mobileWebsiteAnswer';
import testDetails from '../test';

// ANCHOR Main Mobile App that renders various mobile pages
// NOTE gets called by <App />, does not render by itself

class MobileApp extends React.Component {
  constructor(props){
    super(props);
    // TODO change question, answer and website to inlclude integration
    this.state = {
      question: testDetails.question,
      answers: testDetails.answers,
      websites: testDetails.websites,
      displayAnswer: false,
      backToCam: false
    }
    this.changeState = this.changeState.bind(this);
    this.changeDisplayAnswer = this.changeDisplayAnswer.bind(this);

    this.props.history.push(this.state.displayAnswer ? '/Answer' : '/Picture' );
  }

  // Passed to child <MobileAppPicture /> to allow it to change the Parent state to show answer
  changeState(question, answers, website){
    this.setState({question: question, answers: answers, website: website, displayAnswer: true});
  }

  // Passed to child <MobileAnswerApp /> to allow it to change the Parent state to show picture mode
  changeDisplayAnswer(){
    this.setState({ backToCam: true });
    setTimeout(() => {
      this.setState({displayAnswer: false, backToCam: false});
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