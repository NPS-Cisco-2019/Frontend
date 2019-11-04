import React, { useState, useEffect } from 'react';
import { Back } from "./elements";

export default function SavedAnswerPage() {

    const delAnswer = i => {
        let newAnswers = answers.slice(0, i).concat(answers.slice(i + 1, answers.length))
        setAnswers(newAnswers);
        localStorage.setItem('savedAnswers', JSON.stringify(newAnswers));
    }

    const backClick = () => {
        localStorage.setItem('savedAnswers', '[{"question":"question1","answer":["answer1", 0]},{"question":"question2","answer":["answer2", 0]},{"question":"question3","answer":["answer3", 0]},{"question":"question4","answer":["answer4", 0]}]')
    }

    let [answers, setAnswers] = useState(JSON.parse(localStorage.getItem('savedAnswers')));
    const [translate, setTranslate] = useState({ amount: 0, i: -1})

    return (
        <div className="fadein">
            <header className="top" style={{height: Math.round(window.innerHeight/11)}} id="head">
                <Back handleClick={backClick} />
                <p style={{fontSize: '1.2em', margin: 0}}>Saved Answers</p>
            </header>
            <main style={{ position: 'relative', top: Math.round(window.innerHeight/11) }}>
                {
                    answers ?
                        answers.map((answer, i) => (
                            <div key={answer.question} style={{ position: (i === translate.i ? "absolute" : "auto"), top: 0, transform: `translateY(${i > translate.i ? translate.amount : 0}px)`, transition: "transform 500ms cubic-bezier(0.215, 0.610, 0.355, 1)" }}>
                                <SavedAnswer setTranslate={setTranslate} obj={answer} delSelf={delAnswer} i={i} id={`saved-answer-${i}`} />
                            </div>
                        ) ) :
                        <div>No answer</div>
                }
            </main>
        </div>
    )
}




function SavedAnswer({ obj, delSelf, i, id, setTranslate }) {

    const [open, setOpen] = useState(false);
    const [ansOpen, setAnsOpen] = useState(true);
    const [maxHeight, setMaxHeight] = useState('100%');
    const [transition, setTransition] = useState(false);
    const [height, setHeight] = useState('100%');
    const [fadeOut, setFadeOut] = useState(false);
    const [top, setTop] = useState();

    const unmount = () => {
        setFadeOut(true);
        let amount = document.getElementById(id).getBoundingClientRect().height + 20;
        setTranslate({ amount, i });
        // prevent bubbling effects
        openClick();
        setTimeout(() => {
            delSelf(i);
            setTranslate({ amount: 0, i: -1 });
        }, 30000)
    }

    useEffect(() => {
        let top = document.getElementById(id).getBoundingClientRect().top;
        let totHeight = document.getElementById(`${id}-wrapper`).getBoundingClientRect().height;
        let quesHeight = document.getElementById(`${id}-question`).getBoundingClientRect().height;
        setTop(top);
        setHeight(quesHeight + 20)
        setMaxHeight(totHeight);
        setOpen(false);
        setAnsOpen(false);
        setTimeout(() => setTransition(true), 50);
        //eslint-disable-next-line
    }, [])

    const openClick = () => {
        if (open){
            setTimeout(() => setAnsOpen(false), 300);
        } else {
            setAnsOpen(true);
        }
        setOpen(!open);
    }

    let answer = obj.answer;
    let ansLength = answer.length;
    return (
        <div className="savedAnswerWrapper" id={id} style={fadeOut ? { opacity: 1, top: top } : { opacity: 1 }}>
            <div
                className={`savedAnswer ${transition ? 'height-trans' : ''}`}
                id={`${id}-wrapper`}
                onClick={openClick}
                style={{ height: open ? maxHeight : height }}
            >
                <p id={`${id}-question`} className="info" style={{margin: 10}}>{ obj.question }</p>
                {
                    !ansOpen ? null :
                        <>
                            <div className="info" style={{marginTop: 0, marginBottom: 10}}>
                                {
                                    answer.slice(0, ansLength - 1).map((item, i) => (
                                        <p style={{marginBottom: 15}} key={obj.question + '-' + i}>{item}</p>
                                    ))
                                }
                            </div>
                            <button className="deleteSavedAnswer" onClick={unmount}>
                                <img src={require("./pictures/delete.png")} alt="trash"/>
                            </button>
                        </>
                }
            </div>
        </div>
    )
}



// [{"question":"question1","answer":["answer1", 0]},{"question":"question2","answer":["answer2", 0]},{"question":"question3","answer":["answer3", 0]},{"question":"question4","answer":["answer4", 0]}]