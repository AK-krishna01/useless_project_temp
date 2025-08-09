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
