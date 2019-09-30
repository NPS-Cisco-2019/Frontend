import React from 'react';
import MobileAppPicture from './appComponents/mobileWebsiteCamera';
import MobileAppAnswer from './appComponents/mobileWebsiteAnswer';
import CompApp from './appComponents/compWebsite';

let dev = true;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      question: 'What is the meaning of life?',
      answers: ['The meaning of life, or the answer to the question: "What is the meaning of life?", pertains to the significance of living or existence in general. Many other related questions include: "Why are we here?", "What is life all about?", or "What is the purpose of existence?" There have been a large number of proposed answers to these questions from many different cultural and ideological backgrounds. The search for life\'s meaning has produced much philosophical, scientific, theological, and metaphysical speculation throughout history. Different people and cultures believe different things for the answer to this question. '],
      website: 'wikipedia',
      displayAnswer: true
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
    if (typeof window.orientation !== "undefined" || dev){
      return this.state.displayAnswer ? 
      <MobileAppAnswer question={this.state.question} answers={this.state.answers} website={this.state.website} backClick={this.changeDisplayAnswer} /> :
      <MobileAppPicture changeState={this.changeState} />;
    } else {
      return (<CompApp />);
    }
  }
}

export default App;