const mistralApiKey = "fMbIFK1T8Zhtu5yDgtFipbyeZ12J7y9W"; // Replace with your actual API key

export async function generateTextWithMistral(prompt) {
  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${mistralApiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-tiny", // Or other Mistral models like mistral-large, mistral-medium
        messages: [{ role: "user", content: prompt }],
        stream: false, // Set to true for streaming responses
      }),
    });

    const data = await response.json();
    console.log(data.choices[0].message.content);
    return data.choices[0].message.content;

  } catch (error) {
    console.error("Error calling Mistral AI API:", error);
    return null;
  }
}
