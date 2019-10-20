import base64 from './base64Converter';
import testDetails from "./test";

let deploy = false;

// NOTE functions which will handle all backend calls
// TODO integration

export function OCR(imgPath){
    if (deploy) {
        let img = base64(imgPath);
        return fetch("/OCR", {
            method: 'POST',
            body: JSON.stringify({img}),
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        // TODO Remove Temporary non linked server promises which serve test details
        return new Promise((resolve, reject) => {
            resolve({
                json: () => new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({ question: testDetails.question });
                    }, 1000);
                })
            })
        })
    }
}
export function scrape(question){
    if (deploy) {
        return fetch("/scrapy", {
            method: 'POST',
            body: JSON.stringify({question: question}),
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        // TODO Remove Temporary non linked server promises which serve test details
        return new Promise((resolve, reject) => {
            resolve({
                json: () => new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({
                            answers: testDetails.answers,
                            websites: testDetails.websites
                        });
                    }, 2000)
                })
            })
        })
    }
}