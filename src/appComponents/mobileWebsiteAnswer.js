import React from 'react';
import { Back, Answer } from './elements';
import './mobileApp.css';
import './animations.css'
import Swipe from 'react-easy-swipe';
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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

class MobileAppAnswer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            num: 0,
            lastNum: (this.props.answers).length
        }
        this.backClick = this.backClick.bind(this);
        this.nextClick = this.nextClick.bind(this);
        this.swipeNext = this.swipeNext.bind(this);
        this.swipeBack = this.swipeBack.bind(this);
    }

    backClick(){
        this.setState({num: this.state.num - 1, swipe: 'Right'});
    }

    nextClick(){
        this.setState({num: this.state.num + 1, swipe: 'Left'});
    }

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

    componentDidMount(){
        let websitePosition = document.getElementById('websitePosition').getBoundingClientRect();
        this.pos = {top: websitePosition.top, left: websitePosition.left};
    }

    render(){
        const back = this.state.num > 0;
        const next = this.state.num < this.state.lastNum - 1;
        return (
            <div style={{minHeight: window.innerHeight}}>
                <header className="top" style={{height: Math.round(window.innerHeight/11)}}>
                    <Link to="/Picture">
                        <Back handleClick={this.props.backClick} />
                    </Link>
                    <p style={{fontSize: '1.2em', margin: 0, visibility: 'hidden'}} id="websitePosition">Placeholder</p>
                </header>
                <Route render={({location}) => (
                    <TransitionGroup>
                        <CSSTransition
                            timeout={1000}
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
                <Swipe
                    onSwipeLeft={this.swipeNext}
                    onSwipeRight={this.swipeBack}
                    tolerance={100}
                >
                    <Route render={({location}) => (
                        <TransitionGroup>
                            <CSSTransition
                                timeout={1000}
                                classNames={"crunch"}
                                key={location.key}
                            >
                                <Switch location={location}>
                                    <Route path={'/Answer/answer0'} render={() => (
                                        <Answer question={this.props.question} answer={this.props.answers[0]} />
                                    )} />

                                    <Route path={'/Answer/answer1'} render={() => (
                                        <Answer question={this.props.question} answer={this.props.answers[1]} />
                                    )} />

                                    <Route path={'/Answer/answer2'} render={() => (
                                        <Answer question={this.props.question} answer={this.props.answers[2]} />
                                    )} />

                                    <Route path={'/Answer/answer3'} render={() => (
                                        <Answer question={this.props.question} answer={this.props.answers[3]} />
                                    )} />

                                    <Route path={'/Answer/answer4'} render={() => (
                                        <Answer question={this.props.question} answer={this.props.answers[4]} />
                                    )} />
                                    
                                    <Route path={'/'} render={() => (
                                        <Answer question={this.props.question} answer={this.props.answers[0]} />
                                    )} />
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    )} />
                </Swipe>
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
            </div>
        )
    }
}

export default withRouter(MobileAppAnswer);