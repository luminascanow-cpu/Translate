const Tesseract = require('tesseract.js');
async function test() {
  const worker = await Tesseract.createWorker('tam');
  const result = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
  console.log(result.data.blocks.length, "blocks");
  if(result.data.blocks[0]) {
     console.log("Block has paragraphs?", !!result.data.blocks[0].paragraphs);
     if(result.data.blocks[0].paragraphs) {
        console.log("Para has lines?", !!result.data.blocks[0].paragraphs[0].lines);
     }
  }
  await worker.terminate();
}
test();
