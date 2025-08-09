const ctx = document.getElementById('bijuTrendChart').getContext('2d');



const labels = ['oct','Nov','Dec','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep',];

const data = {
  labels: labels,
  datasets: [{
    label: 'Biju Popularity',
    backgroundColor: 'rgba(255, 165, 0, 0.2)', // transparent orange fill
    borderColor: '#ffa500',                     // orange border
    pointBackgroundColor: '#ffb84d',            // lighter orange points
    data: [0,0,100,10,5,5,5,5,5,5],
    fill: true,
    tension: 0.2,
    borderWidth: 3,
    pointRadius: 5,
    pointHoverRadius: 7,
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffa500' // legend text color
        }
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#ffa500',
        bodyColor: '#fff',
      }
    },
    scales: {
      x: {
        ticks: { color: '#ffa500' },
        grid: { color: 'rgba(255, 165, 0, 0.1)' },
        title: {
          display: true,
          text: 'Month',
          color: '#ffa500',
          font: { weight: 'bold' }
        }
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#ffa500' },
        grid: { color: 'rgba(255, 165, 0, 0.1)' },
        title: {
          display: true,
          text: 'Popularity Score',
          color: '#ffa500',
          font: { weight: 'bold' }
        }
      }
    }
  }
};

const bijuTrendChart = new Chart(ctx, config);



async function generateBijuPrompts() {
    const prompt = `Give me 3 creative, fun, or interesting prompts related to Biju, the house lizard, for storytelling, art, or curiosity.`;
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",  // or whichever GPT model you want to use
          messages: [{ role: "user", content: prompt }],
          max_tokens: 150,
          temperature: 0.8
        })
      });
  
      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      const generatedText = data.choices[0].message.content;
  
      document.getElementById("promptDisplay").innerText = generatedText;
    } catch (error) {
      document.getElementById("promptDisplay").innerText = "Error generating prompts: " + error.message;
    }
  }
  
  // Hook up the button
  document.getElementById("generatePromptBtn").addEventListener("click", generateBijuPrompts);
  
