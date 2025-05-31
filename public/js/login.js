document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Store user info in localStorage
                localStorage.setItem('username', data.username);
                localStorage.setItem('role', data.role);

                // Redirect based on role
                if (data.role === 'admin') {
                    window.location.href = 'admin/admin-dashboard.html';
                } else if (data.role === 'employee') {
                    window.location.href = 'employee/employee-dashboard.html';
                } else {
                    window.location.href = 'login-success.html';
                }
            } else {
                alert('Грешно потребителско име или парола!');
            }
        })
        .catch(err => {
            console.error('Грешка при вход:', err);
            alert('Възникна грешка при опит за вход.');
        });
});