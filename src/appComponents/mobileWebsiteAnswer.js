import React from 'react';
import { Back } from './elements';
import './mobileApp.css';

console.log(9 * window.innerWidth/10);

const container = {
    position: 'relative',
    margin: 0,
    top: window.innerHeight / 10,
    width: '100%',
    // display: 'flex',
    padding: '5%',
    justifyItems: 'center',
    alignItems: 'center'
}

const questionStyle = {
    boxSizing: 'border-box',
    borderRadius: window.innerWidth/50,
    width: 9 * window.innerWidth/10,
    padding: 10,
    margin: '3% 0'
}

export default function(props){
    return (
        <div>
            <header className="top" style={{height: Math.round(window.innerHeight/11)}}>
                <Back handleClick={props.backClick} />
                <p style={{fontSize: '1.2em'}}>{props.website}</p>
            </header>
            <div style={container}>
                <div className="question" style={questionStyle}>
                    <p>{props.question}</p>
                </div>
                <div className="question" style={questionStyle}>
                    <p>{props.answers}</p>
                </div>
            </div>
        </div>
    )
}