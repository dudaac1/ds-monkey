async function sendMessage() {
  const userInput = document.getElementById('userInput').value;

  const response = await generateResponse(userInput);
  displayResponse(response);
}

async function generateResponse(inputText) {
  const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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' // Substitua YOUR_API_KEY pelo seu próprio token de autenticação
      },
      body: JSON.stringify({
          inputs: inputText
      })
  });

  const responseData = await response.json();
  return responseData.generated_text;
}

function displayResponse(response) {
  const chatLog = document.getElementById('chatLog');
  const responseElement = document.createElement('p');
  responseElement.textContent = response;
  chatLog.appendChild(responseElement);
}