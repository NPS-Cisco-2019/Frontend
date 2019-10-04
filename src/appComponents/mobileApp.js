import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MobileAppPicture from './mobileWebsiteCamera';
import MobileAppAnswer from './mobileWebsiteAnswer';
import testDetails from '../test';

export default class MobileApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      question: testDetails.question,
      answers: testDetails.answers,
      website: testDetails.websites,
      displayAnswer: false
    }
    this.changeState = this.changeState.bind(this);
    this.changeDisplayAnswer = this.changeDisplayAnswer.bind(this);
  }

  changeState(question, answers, website){
    this.setState({question: question, answers: answers, website: website, displayAnswer: true});
  }

  changeDisplayAnswer(){
    this.setState({displayAnswer: false});
  }

  render(){
    

    return (
        <BrowserRouter>
            {this.state.displayAnswer ? 
            <MobileAppAnswer question={this.state.question} answers={this.state.answers} website={this.state.website} backClick={this.changeDisplayAnswer} /> :
            <MobileAppPicture changeState={this.changeState} />}
        </BrowserRouter>
    );
  }
}
