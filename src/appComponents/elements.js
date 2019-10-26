import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

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

const imgStyle = {
    // height: 9*window.innerHeight/10,
    zIndex: '0',
    margin: 'auto'
  };

const infoStyle = {
    boxSizing: 'border-box',
    borderRadius: window.innerWidth/50,
    width: 9 * window.innerWidth/10,
    padding: 15,
    margin: '3% 0'
}

const answer = {
    overflowY: 'scroll',
    objectFit: 'cover',
    display: 'inline-block',
    minWidth: 9 * window.innerWidth / 10,
    margin: '10px 10%',
    marginLeft: 0,
    flex: 1
}
// !SECTION

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
                <img id={this.state.selected ? 'selectedImg' : '' } src={require("./pictures/flash.png")} alt="flash" className="nav-img" />
            </div>
        );
    }
};

export class SettingsButton extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            style: {zIndex: 69},
            imgClass: ''
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        let left = document.getElementById('settingsDiv').getBoundingClientRect().left;
        let top = document.getElementsByClassName('settings-transitions')[0].getBoundingClientRect().top;
        this.setState({style: { zIndex: 69, left: left, top: top }})
    }

    handleClick(){
        this.setState({
            style: {
                borderRadius: 0,
                height: window.innerHeight,
                width: window.innerWidth,
                backgroundColor: 'var(--backCol)',
                top: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                zIndex: '1000',
                left: 0
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

export function Img({ src }){

    let [fixHeight, setFixHeight] = useState(true);

    useEffect(() => {
        let img = new Image();
        img.src = src;
        let bool = img.naturalHeight / img.naturalWidth > 1;
        setFixHeight(bool);
    }, [src])

    return (
        <img
            src={src}
            alt="pic"
            style={{
                ...imgStyle,
                height: fixHeight ? 9 * window.innerHeight / 10 : 'auto',
                width: fixHeight ? 'auto' : window.innerWidth
            }}
            id="image"
        />
    )
}

export function Answer(props){

    
    let [height, setHeight] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            // eslint-disable-next-line
            let pRect = document.getElementById(props.id).getBoundingClientRect();
            let container = document.getElementById('ansContainer').getBoundingClientRect();

            setHeight(Math.min((container.height - 20), (pRect.height + (2 * infoStyle.padding))));
        }, 100);
        
        // eslint-disable-next-line
    }, []);
    return (
        <div className="info" style={{...infoStyle, ...answer, height: height}}>
            <div id={props.id}>{
                props.answer.map((item, i) => (
                    <p style={{marginBottom: 15}} key={props.id + '-' + i}>{item}</p>
                ))
            }</div>
        </div>
    )
}

export function Subject(){

    const changeSubject = e => {
        let subject = e.target.innerText;
        localStorage.setItem('subject', subject);
        setOpacity(0)
        setTimeout(() => {
            setOpacity(1);
            setSubjects(createSubjectArray(subject));
        }, 400)
    }
    
    const [open, setOpen] = useState(false);
    const [subjects, setSubjects] = useState(createSubjectArray(localStorage.getItem('subject')));
    const [opacity, setOpacity] = useState(1)
    return (
        <div className="subject-button"
            style={{
                height: open ? 125 : 30,
                transition: "all 400ms cubic-bezier(0.215, 0.610, 0.355, 1)"
            }}
            onClick={() => setOpen(!open)}
        >
            <button style ={{
                opacity: opacity
            }}>
                {subjects[0]}
            </button>
            <section>
                {
                    subjects.map((subject, i) => {
                        return i === 0 ? null :
                            <button onClick={changeSubject} key={subject}>{subject}</button>
                    })
                }
            </section>
        </div>
    )
}

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


function createSubjectArray(subject){
    switch (subject) {
        case 'Physics':
            return ['Physics', 'Chemistry', 'Maths', 'General']
        case 'Chemistry':
            return ['Chemistry', 'Physics', 'Maths', 'General']
        case 'Maths':
            return ['Maths', 'Physics', 'Chemistry', 'General']
        default:
            return ['General', 'Physics', 'Chemistry', 'Maths']
    }
}

SettingsButton.propTypes = {
    showSettings: PropTypes.func.isRequired
}

Gallery.propTypes = {
    selectFileHandle: PropTypes.func.isRequired
}

Back.propTypes = {
    handleClick: PropTypes.func.isRequired
}

Answer.propTypes = {
    id: PropTypes.string.isRequired,
    answer: PropTypes.array.isRequired
}