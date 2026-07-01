async function run() {
  const apiKey = "AQ.Ab8RN6KDNYnZATz5iYWgDygFQIAmpa-Ci_0FMMQW_dng-T-1rw";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const prompt = `You are BhashaSetu, a translation assistant.
Analyze the image. Find all text blocks or lines.
For each text block, provide:
1. "original": The original text in the image.
2. "transliterated": The text transliterated into Tamil script for native reading (phonetic conversion, NOT translation). If the original text is already Tamil, keep it as is.
3. "translated": The text translated into Tamil language.
4. "bbox": The bounding box as [ymin, xmin, ymax, xmax] scaled between 0 and 1000.

Return ONLY a valid JSON array of objects without markdown wrappers or other text.
Example: 
[
  {
    "original": "Hello World", 
    "transliterated": "ஹலோ வேர்ல்ட்", 
    "translated": "வணக்கம் உலகம்", 
    "bbox": [100, 200, 150, 400]
  }
]`;

  const imageResp = await fetch("https://tesseract.projectnaptha.com/img/eng_bw.png");
  const buffer = await imageResp.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  const body = {
    contents: [{
      parts: [
        { text: prompt },
        { inlineData: { mimeType: "image/png", data: base64 } }
      ]
    }],
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    console.log(data.candidates[0].content.parts[0].text);
  } catch(e) {
    console.log("Error:", e.message);
  }
}
run();
