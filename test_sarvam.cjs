const targetText = "பள்ளிக்";
fetch("https://api.sarvam.ai/transliterate", {
  method: "POST",
  headers: { "api-subscription-key": "sk_03flqiwj_4ab0sYMxrvkRcwwrvEpRHbqU", "Content-Type": "application/json" },
  body: JSON.stringify({
    input: targetText,
    source_language_code: "ta-IN",
    target_language_code: "en-IN",
    model: "sarvam-translate:v1",
    enable_preprocessing: true
  })
}).then(res => res.json()).then(data => console.log("Transliterate:", data)).catch(console.error);
