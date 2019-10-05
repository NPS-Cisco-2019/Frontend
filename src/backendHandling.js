import testDetails from './test';

// NOTE functions which will handle all backend calls
// TODO integration

export function OCR(img){
    console.log({img});
    console.log('TODO add OCR implementation.');
    return testDetails.question;
}

export function scrape(question){
    console.log({question});
    console.log('TODO add scraping implementation.');
    let returnJSON = {
        answers: testDetails.answers,
        websites: testDetails.websites
    }
    return returnJSON;
}