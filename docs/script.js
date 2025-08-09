document.addEventListener('DOMContentLoaded', () => {

    const unitGrid = document.querySelector('.unit-grid');
    const inputValue = document.getElementById('input-value');
    const resultValue = document.getElementById('result-value');
  
    const categories = [
      "Length",
      "Mass",
      "Area",
      "Volume",
      "Temperature",
      "Speed",
      "Time",
      "Energy",
      "Pressure",
      "Angle",
      "Data",
      "Power"
    ];
  
    const siBaseUnits = {
      Length: "m",
      Mass: "kg",
      Area: "m²",
      Volume: "m³",
      Temperature: "°C",
      Speed: "m/s",
      Time: "s",
      Energy: "J",
      Pressure: "Pa",
      Angle: "deg",
      Data: "MB",
      Power: "W"
    };
  
    const bijuFactors = {
      Length: 2.5,
      Mass: 3.0,
      Area: 6.0,
      Volume: 8.0,
      Temperature: null, // special conversion
      Speed: 1.8,
      Time: 4.0,
      Energy: 5.5,
      Pressure: 0.001,
      Angle: 10,
      Data: 0.02,
      Power: 7.0
    };
  
    function temperatureToBiju(celsius) {
      return (celsius * 1.2) + 10;
    }
  
    function convertToBiju(category, baseValue) {
      if(category === 'Temperature') return temperatureToBiju(baseValue);
      return baseValue * bijuFactors[category];
    }
  
    function updateResult(category) {
      const val = parseFloat(inputValue.value);
      if (isNaN(val)) {
        resultValue.textContent = 'Please enter a valid number.';
        return;
      }
      const bijuVal = convertToBiju(category, val);
      resultValue.textContent = `${val} ${siBaseUnits[category]} = ${bijuVal.toFixed(3)} Bijus`;
    }
  
    // Create category boxes
    categories.forEach(category => {
      const box = document.createElement('div');
      box.classList.add('unit-box');
      box.textContent = category;
      box.style.cursor = 'pointer';
  
      box.addEventListener('click', () => {
        if(inputValue.value.trim() === '') {
          resultValue.textContent = `Biju hates this.Enter a proper value`;
          return;
        }
        updateResult(category);
      });
  
      unitGrid.appendChild(box);
    });



    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
  
    const bijuAudio = new Audio('img/biju-sound.mpeg');
  
    function addMessage(text, sender) {
      const msg = document.createElement('div');
      msg.classList.add('chat-message', sender);
      msg.textContent = text;
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  
    function sendMessage() {
        const userText = userInput.value.trim();
        if (!userText) return;
      
        // Clear entire chat box
        chatBox.innerHTML = '';
      
        // Add user message
        addMessage(userText, 'user');
      
        // Add bot reply after delay
        setTimeout(() => {
          addMessage('zzzzz 🦎', 'bot');
          bijuAudio.play();
        }, 500);
      
        userInput.value = '';
      }
      

  
    sendBtn.addEventListener('click', sendMessage);
  
    userInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  



       
  
  });

  