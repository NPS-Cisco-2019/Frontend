import React from 'react';
import { Back } from './elements';
import './mobileApp.css';

const container = {
    position: 'relative',
    margin: 0,
    top: window.innerHeight / 10,
    width: '100%',
    // display: 'flex',
    padding: '5%',
    justifyItems: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    paddingTop: 0,
    paddingBottom: 7 * window.innerHeight / 100
}

const questionStyle = {
    boxSizing: 'border-box',
    borderRadius: window.innerWidth/50,
    width: 9 * window.innerWidth/10,
    padding: 10,
    margin: '3% 0'
}

const botNavStyle = {
    width: window.innerWidth/3,
}

export default class MobileAppAnswer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            num: 0,
            lastNum: (this.props.answers).length
        }
        this.backClick = this.backClick.bind(this);
        this.nextClick = this.nextClick.bind(this);
    }

    backClick(){
        this.setState({num: this.state.num - 1});
    }

    nextClick(){
        this.setState({num: this.state.num + 1});
    }

    render(){
        const back = this.state.num > 0;
        const next = this.state.num < this.state.lastNum - 1;
        return (
            <div style={{minHeight: window.innerHeight}}>
                <header className="top" style={{height: Math.round(window.innerHeight/11)}}>
                    <Back handleClick={this.props.backClick} />
                    <p style={{fontSize: '1.2em'}}>{this.props.website[this.state.num]}</p>
                </header>
                <div style={container}>
                    <div className="question" style={questionStyle}>
                        <p>{this.props.question}</p>
                    </div>
                    <div className="question" style={questionStyle}>
                        <p className="notCenter">{this.props.answers[this.state.num]}</p>
                    </div>
                </div>
                <div className="bot">
                    <p className="botItem button" style={{...botNavStyle, opacity: back ? 1 : 0.5}} onClick={back ? this.backClick : null}>{'< Back'}</p>
                    <p className="botItem" style={botNavStyle}>Answer {this.state.num + 1}</p>
                    <p className="botItem button" style={{...botNavStyle, opacity: next ? 1 : 0.5}} onClick={next ? this.nextClick : null}>{'Next >'}</p>
                </div>
            </div>
        )
    }
}