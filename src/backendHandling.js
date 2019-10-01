import testDetails from './test';

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