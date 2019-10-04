import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import MobileAppPicture from './mobileWebsiteCamera';
import MobileAppAnswer from './mobileWebsiteAnswer';
import testDetails from '../test';

class MobileApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      question: testDetails.question,
      answers: testDetails.answers,
      websites: testDetails.websites,
      displayAnswer: true
    }
    this.changeState = this.changeState.bind(this);
    this.changeDisplayAnswer = this.changeDisplayAnswer.bind(this);

    this.props.history.push(this.state.displayAnswer ? 'Answer' : 'Picture' );
  }

  changeState(question, answers, website){
    this.setState({question: question, answers: answers, website: website, displayAnswer: true});
  }

  changeDisplayAnswer(){
    this.setState({displayAnswer: false});
  }

  render(){
    return (
      
        <Switch>
          <Route path="/Answer" render={() => (
            <MobileAppAnswer question={this.state.question} answers={this.state.answers} websites={this.state.websites} backClick={this.changeDisplayAnswer} />
          )} />
          
          <Route path="/Picture" render={() => (
            <MobileAppPicture changeState={this.changeState} />
          )} />
        </Switch>
    );
  }
}


export default withRouter(MobileApp);