async function run() {
  const apiKey = "AQ.Ab8RN6KDNYnZATz5iYWgDygFQIAmpa-Ci_0FMMQW_dng-T-1rw";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const prompt = `You are BhashaSetu, a translation assistant.
Analyze the image. Find all text blocks or lines.
For each text block, provide:
1. "original": The original text in the image.
2. "transliterated": The text transliterated into the English alphabet for phonetic reading. Provide the exact pronunciation of the original text written using the script/alphabet of English.
3. "translated": The text translated into English language.
4. "bbox": The bounding box as [ymin, xmin, ymax, xmax] scaled between 0 and 1000.

Return ONLY a valid JSON array of objects without markdown wrappers or other text.`;

  // Provide an image of Tamil text (you can use base64 here if needed, but I'll use text input for simplicity to test the model's transliteration of Tamil)
  const body = {
    contents: [{
      parts: [
        { text: prompt },
        { text: "Here is the text to analyze: முதல் வகுப்பு" }
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
