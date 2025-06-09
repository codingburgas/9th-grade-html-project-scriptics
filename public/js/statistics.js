document.addEventListener('DOMContentLoaded', () => {
    // Fetch from your REAL API endpoint
    fetch('/api/disasters')
        .then(response => response.json())
        .then(disasters => {
            console.log("Data successfully fetched from API:", disasters);

            const approvedDisasters = disasters.filter(disaster => disaster.status !== 'pending');
            const counts = { fire: 0, flood: 0, earthquake: 0, crash: 0 };
            const disasterLabels = { fire: 'Пожар', flood: 'Наводнение', earthquake: 'Земетресение', crash: 'Катастрофа' };

            approvedDisasters.forEach(disaster => {
                if (counts.hasOwnProperty(disaster.type)) {
                    counts[disaster.type]++;
                }
            });

            const ctx = document.getElementById('disasterChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.values(disasterLabels),
                    datasets: [{
                        label: 'Брой на инциденти (одобрени)',
                        data: Object.values(counts),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: { scales: { y: { beginAtZero: true } } }
            });
        })
        .catch(error => {
            console.error("Could not fetch statistics from API:", error);
        });
});