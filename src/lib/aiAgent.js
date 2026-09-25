
export async function runPramaanAIAudit({ beforeImgUrl, afterImgUrl, description, reportedCost, category }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("Gemini API Key missing. Falling back to default confidence.");
    return null;
  }

  const prompt = `
You are the "Pramaan AI Verification Agent" for a civic governance framework.
Your task is to analyze an reported issue and verify if the repair/resolution work shown in the proof image is authentic, complete, and reasonable.

Context:
- Category: ${category}
- Claimed Repair Description: ${description}
- Claimed Cost: ₹${reportedCost}
- Before Image URL: ${beforeImgUrl}
- After Image URL: ${afterImgUrl}

Evaluate the evidence and return strictly valid JSON matching this exact structure:
{
  "locationOk": true,
  "timestampOk": true,
  "reportedCost": ${reportedCost},
  "benchCost": 5000,
  "tampering": "None Detected" or "Possible Manipulation Detected",
  "confidence": <integer between 0 and 100 representing overall authenticity>,
  "approved": <true if confidence >= 75, else false>,
  "coins": <calculated reward coins, e.g., 400>,
  "aiSummary": "<1-2 sentence summary of what visual evidence was detected>"
}
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                { image_url: { url: beforeImgUrl } },
                { image_url: { url: afterImgUrl } }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    const cleanedJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedJson);
  } catch (err) {
    console.error("Pramaan AI Agent Execution Failed:", err);
    return null;
  }
}
