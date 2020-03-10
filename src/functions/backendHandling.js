import base64 from "./base64Converter";

import testDetails from "shared/test";

// NOTE functions which will handle all backend calls

export function OCR(imgPath, cropJSON) {
  let img = base64(imgPath, cropJSON);

  return new Promise(resolve => {
    resolve({
      status: 200,
      json: () =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve({ question: testDetails.question, img });
          }, 0);
        })
    });
  });
  // return fetch("/OCR", {
  //   method: "POST",
  //   body: JSON.stringify({ img }),
  //   headers: { "Content-Type": "application/json" }
  // });
}

export function scrape(question) {
  // return fetch("/scrapy", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     question: question,
  //     subject: localStorage.getItem("subject"),
  //     grade: localStorage.getItem("grade")
  //   }),
  //   headers: { "Content-Type": "application/json" }
  // });

  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      json: () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              answers: testDetails.answers,
              websites: testDetails.websites
            });
          }, 0);
        })
    });
  });
}
