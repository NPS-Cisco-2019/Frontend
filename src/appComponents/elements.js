import React, { useEffect, useRef } from 'react';


// SECTION inline styles
let maxLength = (10/100) * (69/100) * window.innerHeight;

const navObj = {
    boxSizing: 'border-box',
    alignContent: 'center',
    justifyContent: 'center',
    padding: maxLength/5,
    height: maxLength,
    borderRadius: '50%',
    width: maxLength,
    cursor: 'pointer',
    objectFit: 'cover'
}

const infoStyle = {
    boxSizing: 'border-box',
    borderRadius: window.innerWidth/50,
    width: 9 * window.innerWidth/10,
    padding: 15,
    margin: '3% 0'
}

const answer = {
    maxHeight: 3 * window.innerHeight / 4,
    overflowY: 'scroll',
    objectFit: 'cover',
    display: 'inline-block',
    minWidth: 9 * window.innerWidth / 10,
    margin: '10px 10%',
    marginLeft: 0,
    flex: 1
}
// !SECTION


// SECTION Mobile Components

export class Flash extends React.Component {
    constructor(props){
        super(props);
        this.state = {selected: true};
        this.handleClick = this.handleClick.bind(this);
    }

    // changes whether flashlight is enabled or disabled
    // TODO add flashlight fucntionality
    handleClick(){
        this.setState({ selected: !this.state.selected });
    }

    render(){
        return (
            <div id={this.state.selected ? 'selected' : '' } className="selectable" style={navObj} onClick={this.handleClick}>
                <img src={require("./pictures/flash.png")} alt="flash" className="nav-img" />
            </div>
        );
    }
};

export class Settings extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            style: {zIndex: 70},
            imgClass: ''
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState({
            style: {
                borderRadius: 0,
                height: window.innerHeight,
                width: window.innerWidth,
                backgroundColor: 'rgb(25 ,25, 25)',
                top: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                zIndex: '69'
            },
            imgClass: "lateFade"
        })
        this.props.showSettings();
    }

    // TODO make settings menu
    render(){
        return (
            <div style={{...navObj, ...this.state.style}} className="settings-transitions">
                <img src={require("./pictures/settings.png")} 
                alt="settings" 
                className={`nav-img ${this.state.imgClass}`}
                style={{maxHeight: 3*maxLength/5}}
                onClick={this.handleClick} />
            </div>
        );
    }
};

export class Gallery extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFile: null
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        // if image is clicked triggers input component
        this.refs.gallery.click();
    }

    render(){
        return (
            <div style={navObj}>
                <img src={require("./pictures/gallery.png")} alt="Gallery" className="nav-img" onClick={this.handleClick} />
                <input type="file" accept="image/*" ref="gallery" onChange={this.props.selectFileHandle} style={{display: "none"}} />
            </div>
        );
    }
};

export function Back(props){
    return (
        <div style={{...navObj, textAlign: 'center'}} onClick={props.handleClick}>
            <img src={require("./pictures/back.png")} alt="back" className="nav-img" />
        </div>
    )
};

export function Answer(props){

    
    let height = useRef({});

    useEffect(() => {
        // eslint-disable-next-line
        let pRect = document.getElementById(props.id).getBoundingClientRect();
        let container = document.getElementById('ansContainer').getBoundingClientRect();

        height.current.height = Math.min((container.height - 20), (pRect.height + (2 * infoStyle.padding)));
        // eslint-disable-next-line
    }, [])

    return (
        <div className="info" style={{...infoStyle, ...answer, height: height.current.height}}>
            <p style={{margin: 0}} id={props.id}>{props.answer}</p>
        </div>
    )
}

// !SECTION


// SECTION Desktop Components

// Firefox tutroial
export function Firefox() {
    let style = {
        height: window.innerHeight * 2,
        position: 'absolute'
    }
    return (
        <div style={{...style, borderTop: '2px solid rgb(200, 0 ,0)'}} className="tut tutFirefox" id="firefoxTut">
            <div className="img1">
                <img className="tutImg" src={require("./pictures/firefox1.jpg")} alt="tutorial 1" />
            </div>
            <div className="p1">
                <p id="font100">Click on the the circled button</p>
            </div>
            <div className="img2">
                <img className="tutImg" src={require("./pictures/firefox2.jpg")} alt="tutorial 2" />
            </div>
            <div className="p2">
                <p id="font100">Click on "+ADD TO HOME SCREEN" to install to your home screen.</p>
            </div>
        </div>
    );
}

// Chrome tutroial
export function Chrome() {
    let style = {
        height: window.innerHeight * 3,
        position: 'absolute'
    }
    return (
        <div style={{...style, borderTop: '2px solid rgb(18, 218, 0)'}} className="tut tutOthers" id="chromeTuts">
            <div className="img1">
                <img className="tutImg" src={require("./pictures/chrome1.jpg")} alt="tutorial 1" />
            </div>
            <div className="p1">
                <p id="font100">Click on the the circled button</p>
            </div>
            <div className="img2">
                <img className="tutImg" src={require("./pictures/chrome2.jpg")} alt="tutorial 2" />
            </div>
            <div className="p2">
                <p id="font100">Click on "Add to Home screen".</p>
            </div>
            <div className="img3">
                <img className="tutImg" src={require("./pictures/chrome3.jpg")} alt="tutorial 3" />
            </div>
            <div className="p3">
                <p id="font100">Click on "Add" to install to your home screen.</p>
            </div>
        </div>
    );
}

// Safari tutroial
export function Safari() {
    let style = {
        height: window.innerHeight * 3,
        position: 'absolute'
    }
    return (
        <div style={{...style, borderTop: '2px solid rgb(0, 0, 255)'}} className="tut tutOthers" id="safariTut">
            <div className="img1">
                <img className="tutImg" src={require("./pictures/safari1.jpg")} alt="tutorial 1" />
            </div>
            <div className="p1">
                <p id="font100">Click on the the circled button</p>
            </div>
            <div className="img2">
                <img className="tutImg" src={require("./pictures/safari2.jpg")} alt="tutorial 2" />
            </div>
            <div className="p2">
                <p id="font100">After scrolling down, click on "Add to Home Screen".</p>
            </div>
            <div className="img3">
                <img className="tutImg" src={require("./pictures/safari3.jpg")} alt="tutorial 3" />
            </div>
            <div className="p3">
                <p id="font100">Click on "Add" to install to your home screen.</p>
            </div>
        </div>
    );
}

// detects which browser is being used
export function getBrowser(){
    if (typeof InstallTrigger !== 'undefined') {
        return 'firefox';
    } else if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'])) {
        return 'safari';
    } else if (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) {
        return 'chrome';
    } else {
        console.log('unknown');
    }
}

// !SECTION


// NOTE Currently unused
// TODO Add Error boundries and make Error page
export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
}