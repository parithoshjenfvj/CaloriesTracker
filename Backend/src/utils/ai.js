const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function callYourAI(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",  // ✅ Correct model
      contents: prompt,
    });

    const text = response.text;

    //console.log("AI RAW:", text);

    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
}

module.exports = callYourAI;