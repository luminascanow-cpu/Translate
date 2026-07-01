export const getSarvamLangCode = (lang: string): string => {
  const languageMap: Record<string, string> = {
    "Hindi": "hi-IN",
    "Marathi": "mr-IN",
    "Bengali": "bn-IN",
    "Tamil": "ta-IN",
    "Telugu": "te-IN",
    "English": "en-IN"
  };
  return languageMap[lang] || "hi-IN";
};

export const playSarvamTTS = async (text: string, langName: string): Promise<void> => {
  const apiKey = import.meta.env.VITE_SARVAM_API_KEY;
  if (!apiKey) {
    console.error("Missing VITE_SARVAM_API_KEY");
    return;
  }

  const langCode = getSarvamLangCode(langName);
  
  try {
    const response = await fetch("https://api.sarvam.ai/text-to-speech", {
      method: "POST",
      headers: {
        "api-subscription-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: [text],
        target_language_code: langCode,
        speaker: "priya",
        pace: 1.0,
        speech_sample_rate: 8000,
        enable_preprocessing: true,
        model: "bulbul:v3"
      })
    });

    const data = await response.json();
    if (data.audios && data.audios.length > 0) {
      const audioBase64 = data.audios[0];
      const audio = new Audio("data:audio/wav;base64," + audioBase64);
      audio.play();
      return new Promise((resolve) => {
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
      });
    } else {
      console.error("Sarvam TTS Error:", data);
    }
  } catch (err) {
    console.error("Error playing Sarvam TTS:", err);
  }
};
