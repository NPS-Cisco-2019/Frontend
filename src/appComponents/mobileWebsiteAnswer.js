// SECTION imports
import React from 'react';
import { Back, Answer } from './elements';
import './mobileApp.css';
import './animations.css'
import Swipe from 'react-easy-swipe';
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// !SECTION

// SECTION Inline Styles
const botNavStyle = {
    width: window.innerWidth/3,
    margin: 0
}

const webStyle = {
    fontSize: '1.2em',
    margin: 0,
    position: 'fixed',
    zIndex: 69
}

const container = {
    position: 'absolute',
    margin: 0,
    top: window.innerHeight / 11,
    width: window.innerWidth,
    padding: window.innerWidth / 20,
    justifyItems: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    paddingTop: 0,
    paddingBottom: 7 * window.innerHeight / 100,
    overflow: 'hidden'
}

const infoStyle = {
    boxSizing: 'border-box',
    borderRadius: window.innerWidth/50,
    width: 9 * window.innerWidth/10,
    padding: 10,
    margin: '1.4% 0'
}
// !SECTION

class MobileAppAnswer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            num: 0,
            lastNum: (this.props.answers).length
        }

        document.body.style.overflowX = 'hidden';

        // SECTION function bindings
        this.backClick = this.backClick.bind(this);
        this.nextClick = this.nextClick.bind(this);
        this.swipeNext = this.swipeNext.bind(this);
        this.swipeBack = this.swipeBack.bind(this);
        // !SECTION
    }

    /* SECTION FUNCTIONS */

    // goes to previous answer
    backClick(){
        this.setState({num: this.state.num - 1});
    }

    // goes to next answer
    nextClick(){
        this.setState({num: this.state.num + 1});
    }

    // SECTION swipe functions
    swipeNext(){
        if (this.state.num < this.state.lastNum - 1){
            this.nextClick();
            this.props.history.push(`/Answer/answer${this.state.num + 1}`)
        }
    }

    swipeBack(){
        if (this.state.num > 0){
            this.backClick();
            this.props.history.push(`/Answer/answer${this.state.num - 1}`)
        }
    }
    // !SECTION

    componentDidMount(){
        let websitePosition = document.getElementById('websitePosition').getBoundingClientRect();
        this.pos = {top: websitePosition.top, left: websitePosition.left};
    }
    /* !SECTION */

    render(){
        const back = this.state.num > 0;
        const next = this.state.num < this.state.lastNum - 1;
        return (
            <div style={{minHeight: window.innerHeight}}>
                {/* SECTION Back Button */}
                <header className="top" style={{height: Math.round(window.innerHeight/11)}}>
                    <Link to="/Picture">
                        <Back handleClick={this.props.backClick} />
                    </Link>
                    <p style={{fontSize: '1.2em', margin: 0, visibility: 'hidden'}} id="websitePosition">Placeholder</p>
                </header>
                {/* !SECTION */}
                {/* SECTION Website displayer */}
                {/* NOTE Its in a seperate Route because of different */}
                <Route render={({location}) => (
                    <TransitionGroup>
                        <CSSTransition
                            timeout={600}
                            classNames="fade"
                            key={location.key}
                        >
                            <Switch location={location}>
                                <Route path="/Answer/answer0" render={() => (
                                    <p style={{...webStyle, ...this.pos}}>{this.props.websites[0]}</p>
                                )} />

                                <Route path="/Answer/answer1" render={() => (
                                    <p style={{...webStyle, ...this.pos}}>{this.props.websites[1]}</p>
                                )} />

                                <Route path="/Answer/answer2" render={() => (
                                    <p style={{...webStyle, ...this.pos}}>{this.props.websites[2]}</p>
                                )} />

                                <Route path="/Answer/answer3" render={() => (
                                    <p style={{...webStyle, ...this.pos}}>{this.props.websites[3]}</p>
                                )} />

                                <Route path="/Answer/answer4" render={() => (
                                    <p style={{...webStyle, ...this.pos}}>{this.props.websites[4]}</p>
                                )} />
                                
                                <Route path="/" render={() => (
                                    <p style={{...webStyle, ...this.pos}}>{this.props.websites[0]}</p>
                                )} />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )} />
                {/* !SECTION */}
                {/* SECTION Answer displayer */}
                <div style={container}>
                    <div className="info" style={infoStyle} id="question">
                        <p style={{margin: 0}}>{this.props.question}</p>
                    </div>
                    <Swipe
                        onSwipeLeft={this.swipeNext}
                        onSwipeRight={this.swipeBack}
                        tolerance={100}
                    >
                        <div className="answerContainer" style={{transform: `translateX(-${this.state.num * 110}%)`}}>
                            {
                                this.props.answers.map((item, i) => (
                                    <Answer question={this.props.question} answer={item} key={this.props.websites[i]} id={"p" + i} />
                                ))
                            }
                        </div>
                    </Swipe>
                </div>
                {/* !SECTION */}
                {/* SECTION Bottom Navigation */}
                <div className="bot">
                    {back ?
                    <Link to={`/Answer/answer${this.state.num-1}`}>
                        <p className="botItem button" style={{...botNavStyle, opacity: 1}} onClick={this.backClick}>{'< Back'}</p>
                    </Link>:
                    <p className="botItem button" style={{...botNavStyle, opacity: 0.5}}>{'< Back'}</p>}
                    
                    <p className="botItem" style={botNavStyle}>Answer {this.state.num + 1}</p>

                    {next ?
                    <Link to={`/Answer/answer${this.state.num+1}`}>
                        <p className="botItem button" style={{...botNavStyle, opacity: 1}} onClick={this.nextClick}>{'Next >'}</p>
                    </Link> :
                    <p className="botItem button" style={{...botNavStyle, opacity: 0.5}}>{'Next >'}</p>}
                </div>
                {/* !SECTION */}
            </div>
        )
    }
}

export default withRouter(MobileAppAnswer);