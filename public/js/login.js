document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Fetch from your REAL API endpoint
    fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                console.log('Login successful for role:', data.role);
                localStorage.setItem('username', username); // We can still store the username
                localStorage.setItem('userRole', data.role);

                if (data.role === 'employee') {
                    window.location.href = '/employee/employee-dashboard.html';
                }
            } else {
                alert('Грешно потребителско име или парола!');
            }
        })
        .catch(err => {
            console.error('Login fetch error:', err);
            alert('Възникна грешка при вход.');
        });
});