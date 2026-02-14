import OpenAI from "openai";

let openai = null;

// Only initialize OpenAI if key exists
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log("OpenAI enabled");
} else {
  console.log("OpenAI disabled – using fallback extractor");
}

// Simple fallback extractor
function fallbackExtract(text) {
  const sentences = text.split(".");
  const actions = [];

  for (let s of sentences) {
    const parts = s.split(" and ");

    for (let part of parts) {
      if (part.toLowerCase().includes("will")) {
        const w = part.split("will");

        actions.push({
          owner: w[0]?.trim().split(" ").slice(-1)[0],
          task: w[1]?.replace(/,$/, "").trim(),
          due: "",
        });
      }
    }
  }

  return actions;
}




export async function extractActions(text) {
  // If OpenAI not available → fallback
  if (!openai) {
    return fallbackExtract(text);
  }

  try {
    const prompt = `
Extract action items from this meeting transcript.
Return ONLY valid JSON array with fields: task, owner, due.

Transcript:
${text}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const raw = completion.choices[0].message.content;
    return JSON.parse(raw);

  } catch (err) {
    console.log("OpenAI failed – using fallback");
    return fallbackExtract(text);
  }
}
