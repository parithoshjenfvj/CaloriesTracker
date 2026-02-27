const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function callYourAI(prompt, imageBuffer = null, mimeType = null) {
  try {
    let contents;

    // ✅ If image exists → Vision mode
    if (imageBuffer && mimeType) {
      const base64Image = imageBuffer.toString("base64");

      contents = [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Image,
              },
            },
          ],
        },
      ];
    } 
    // ✅ If no image → Text mode
    else {
      contents = prompt;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
    });

    const text =
      response.text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text;

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