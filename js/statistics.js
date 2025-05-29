const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Пожар', 'Катастрофа', 'Наводнение', 'Земетресение'],
        datasets: [{
            label: 'Брой на инциденти',
            data: [5, 7, 3, 1],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});