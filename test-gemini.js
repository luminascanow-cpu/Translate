const { GoogleGenAI } = require("@google/genai");

async function test() {
  const apiKey = "AQ.Ab8RN6KDNYnZATz5iYWgDygFQIAmpa-Ci_0FMMQW_dng-T-1rw";
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Hello, just testing the API",
    });
    console.log("Success:", response.text);
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
