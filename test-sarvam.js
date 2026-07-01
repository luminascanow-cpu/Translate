const fs = require('fs');

async function test() {
  const sarvamKey = "sk_03flqiwj_4ab0sYMxrvkRcwwrvEpRHbqU";
  const text = "नमस्ते\nदुनिया";
  
  const sarvamRes = await fetch("https://api.sarvam.ai/transliterate", {
    method: "POST",
    headers: {
      "api-subscription-key": sarvamKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: text,
      source_language_code: "hi-IN",
      target_language_code: "en-IN",
      model: "sarvam-translate:v1",
      enable_preprocessing: true
    })
  });
  const sarvamData = await sarvamRes.json();
  console.log(sarvamData);
}

test();
