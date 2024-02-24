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
    const params = {
        messages: [{ "role": "user", "content": inputText }],
        do_sample: true,
        max_tokens: 200,
        temperature: 0.2,
        top_p: 0.75,
    };

  try {
    const response = await fetch('https://chat.maritaca.ai/api/chat/inference', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Key chave' // Substitua YOUR_API_KEY pelo seu próprio token de autenticação
        },
        body: JSON.stringify(params)
    });

    const responseData = await response.json();

    return responseData.answer;
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
