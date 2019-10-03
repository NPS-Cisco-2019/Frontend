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
        document.scrollingElement.scrollTo(0,0)
    }

    nextClick(){
        this.setState({num: this.state.num + 1, swipe: 'Left'});
        document.scrollingElement.scrollTo(0, 0);
    }

    swipeNext(){
        if (this.state.num < this.state.lastNum - 1){
            this.nextClick();
            this.props.history.push(`/answer${this.state.num + 1}`)
        }
    }

    swipeBack(){
        if (this.state.num > 0){
            this.backClick();
            this.props.history.push(`/answer${this.state.num - 1}`)
        }
    }

    render(){
        const back = this.state.num > 0;
        const next = this.state.num < this.state.lastNum - 1;
        return (
            <div style={{minHeight: window.innerHeight}}>
                <header className="top" style={{height: Math.round(window.innerHeight/11)}}>
                    <Back handleClick={this.props.backClick} />
                    <p style={{fontSize: '1.2em', margin: 0}}>{this.props.website[this.state.num]}</p>
                </header>
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
                                    <Route path={'/answer0'} render={() => (
                                        <Answer question={this.props.question} answer={this.props.answers[0]} />
                                    )} />

                                    <Route path={'/answer1'} render={() => (
                                        <Answer question={this.props.question} answer={this.props.answers[1]} />
                                    )} />

                                    <Route path={'/answer2'} render={() => (
                                        <Answer question={this.props.question} answer={this.props.answers[2]} />
                                    )} />

                                    <Route path={'/answer3'} render={() => (
                                        <Answer question={this.props.question} answer={this.props.answers[3]} />
                                    )} />

                                    <Route path={'/answer4'} render={() => (
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
                    <Link to={`answer${this.state.num-1}`}>
                        <p className="botItem button" style={{...botNavStyle, opacity: 1}} onClick={this.backClick}>{'< Back'}</p>
                    </Link>:
                    <p className="botItem button" style={{...botNavStyle, opacity: 0.5}}>{'< Back'}</p>}
                    
                    <p className="botItem" style={botNavStyle}>Answer {this.state.num + 1}</p>

                    {next ?
                    <Link to={`answer${this.state.num+1}`}>
                        <p className="botItem button" style={{...botNavStyle, opacity: 1}} onClick={this.nextClick}>{'Next >'}</p>
                    </Link> :
                    <p className="botItem button" style={{...botNavStyle, opacity: 0.5}}>{'Next >'}</p>}
                </div>
            </div>
        )
    }
}

export default withRouter(MobileAppAnswer);