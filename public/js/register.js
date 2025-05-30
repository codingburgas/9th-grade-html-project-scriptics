document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const lat = parseFloat(document.getElementById('lat').value);
    const lng = parseFloat(document.getElementById('lng').value);
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const type = document.getElementById('type').value;

    const report = {
        type,
        location: { lat, lng },
        date,
        description
    };

    fetch('/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(report)
        })
        .then(res => res.json())
        .then(data => {
            console.log('Успешно изпратено:', data);
            alert('Произшествието беше изпратено успешно!');
        })
        .catch(err => {
            console.error('Грешка при изпращане:', err);
            alert('Възникна грешка при изпращане.');
        });
});