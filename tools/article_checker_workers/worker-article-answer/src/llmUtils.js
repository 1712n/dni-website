export async function callOpenAI(systemPrompt, prompt, OPENAI_API_KEY, LLM_ENDPOINT, model = "gpt-3.5-turbo-0125") {
    const url = LLM_ENDPOINT;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    };
    const requestBody = {
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ]
    };
  
    try {
      const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(requestBody) });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const chatCompletion = await response.json();
      return chatCompletion;
    } catch (error) {
      console.error('There was a problem with the OpenAI call:', error);
      return null;
    }
  }  