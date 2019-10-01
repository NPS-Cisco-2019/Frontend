import React from 'react';
import MobileAppPicture from './appComponents/mobileWebsiteCamera';
import MobileAppAnswer from './appComponents/mobileWebsiteAnswer';
import CompApp from './appComponents/compWebsite';
import testDetails from './test';

let dev = false;

class App extends React.Component {
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