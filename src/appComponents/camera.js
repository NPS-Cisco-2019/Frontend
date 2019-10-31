import React, { useEffect } from 'react';
import styles from "./style";

export default function Camera({ setParentState, error }) {

    useEffect(() => {

        let constraints = {
            audio: false,
            video: { ...styles.videoConstraints }
        }

        if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    const track = stream.getVideoTracks()[0];

                    let video = document.getElementById('camera');

                    video.src = track;

                    let imageCapture = new ImageCapture(track);

                    setParentState({ imageCapture });

                    let btn = document.getElementById('flash');

                    btn.addEventListener('click', function(){

                        track.applyConstraints({
                          advanced: [{torch: !track.getConstraints().advanced[0].torch}]
                        });
                    })
                })
                .catch(err => {
                    error();
                    console.log({"Camera Error": err});
                })
        }
        //eslint-disable-next-line
    }, [])

    return (
        <video id="camera" autoPlay />
    )
}
