const sarvamKey = process.env.VITE_SARVAM_API_KEY;
fetch("https://api.sarvam.ai/transliterate", {
  method: "POST",
  headers: {
    "api-subscription-key": "sk_03flqiwj_4ab0sYMxrvkRcwwrvEpRHbqU",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    input: "मैं ऑफिस जा रहा हूँ",
    source_language_code: "hi-IN",
    target_language_code: "en-IN"
  })
}).then(res => res.json()).then(console.log).catch(console.error);
