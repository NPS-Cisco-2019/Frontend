import React from 'react';

let maxLength = (10/100) * (50/100) * window.innerHeight;

const navObj = {
  'alignItems': 'center',
  'justifyItems': 'center',
  'padding': '10%',
  'height': maxLength,
  'borderRadius': '50%',
  'width': maxLength
}

const tutStyle = {
    height: 1000
}

export class Flash extends React.Component {
    constructor(props){
        super(props);
        this.state = {selected: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        let selected = this.state.selected;
        this.setState({ selected: !selected });
    }

    render(){
        return (
        <div className={this.state.selected ? 'selected' : '' } style={navObj} onClick={this.handleClick}>
            <img src={require("./pictures/flash.png")} alt="flash" className="nav-img" />
        </div>
        );
    }
};

export class Settings extends React.Component {
    render(){
        return (
            <div style={navObj}>
                <img src={require("./pictures/settings.png")} alt="settings" className="nav-img" />
            </div>
        );
    }
};

export class Gallery extends React.Component {
    render(){
        return (
            <div style={navObj}>
                <img src={require("./pictures/gallery.png")} alt="Gallery" className="nav-img" />
            </div>
        );
    }
};


export function Firefox() {
    return (
        <div style={tutStyle}>
            <p>TODO Firefox tutorial</p>
        </div>
    );
}

export function Chrome() {
    return (
        <div style={tutStyle}>
            <p>TODO Chrome tutorial</p>
        </div>
    );
}

export function Safari() {
    return (
        <div style={tutStyle}>
            <p>TODO Safari tutorial</p>
        </div>
    );
}