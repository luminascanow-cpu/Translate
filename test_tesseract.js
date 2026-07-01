const Tesseract = require('tesseract.js');
const fs = require('fs');

async function test() {
  const result = await Tesseract.recognize(
    'https://tesseract.projectnaptha.com/img/eng_bw.png',
    'eng'
  );
  console.log("Line 0:", JSON.stringify(result.data.lines[0].bbox));
}
test();
