// Measurement categories
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
    "Data Storage",
    "Power"
];

// Create category boxes in middle panel
const unitGrid = document.querySelector('.unit-grid');
categories.forEach(category => {
    const box = document.createElement('div');
    box.classList.add('unit-box');
    box.textContent = category;
    box.addEventListener('click', () => {
        addMessage(`Convert values in ${category}`, 'user');
        bijuGPTResponse(`Category: ${category}`);
    });
    unitGrid.appendChild(box);
});

// Chat functions
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
    const query = userInput.value.trim();
    if (query) {
        addMessage(query, 'user');
        bijuGPTResponse(query);
        userInput.value = '';
    }
});

function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('chat-message', sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function bijuGPTResponse(query) {
    // Placeholder AI response
    setTimeout(() => {
        addMessage(`I can help with ${query} conversions. (Demo mode)`, 'bot');
    }, 500);
}
