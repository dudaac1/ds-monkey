const userInput = document.getElementById('userInput');
const chatLog = document.getElementById('chatLog');

async function sendMessage() {
  userInputValue = userInput.value;
  // console.log(userInputValue);
  userInput.value = '';

  var p = document.createElement('p');
  p.innerHTML = "<b>YOU:</b><br>" + userInputValue;
  p.classList = 'sent';
  chatLog.appendChild(p);

  const response = await generateResponse(userInputValue);
  displayResponse(await response);
}

async function generateResponse(inputText) {
  const loader = document.querySelector('.loader');
  loader.style.display = 'inline-block'; // Mostra o loader

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your_api_key' // Substitua YOUR_API_KEY pelo seu próprio token de autenticação
        },
        body: JSON.stringify({
            inputs: inputText
        })
    });

    const responseData = await response.json();

    return responseData[0].generated_text;
  } catch (error) {
    console.error('Erro ao gerar resposta:', error);
  } finally {
    loader.style.display = 'none'; // Esconde o loader
  }
}

function displayResponse(response) {
  var p = document.createElement('p');
  p.innerHTML = "<b>LUNA:</b><br>" + response;
  p.classList = 'received';
  chatLog.appendChild(p);
}
