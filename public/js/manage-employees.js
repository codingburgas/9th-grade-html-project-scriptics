document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addEmployeeForm');
    const employeesList = document.getElementById('employeesList');

    // Зареждане на служителите при зареждане
    fetch('/api/employees')
        .then(res => res.json())
        .then(data => renderEmployees(data))
        .catch(err => console.error('Грешка при зареждане на служители:', err));

    form.addEventListener('submit', e => {
        e.preventDefault();
        const username = document.getElementById('newUsername').value.trim();
        const password = document.getElementById('newPassword').value.trim();

        if (!username || !password) return alert('Моля въведи потребителско име и парола.');

        fetch('/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            .then(res => res.json())
            .then(data => {
                renderEmployees(data);
                form.reset();
            })
            .catch(err => console.error('Грешка при добавяне:', err));
    });

    function renderEmployees(employees) {
        employeesList.innerHTML = '';
        employees.forEach(emp => {
            const div = document.createElement('div');
            div.className = 'employee-card';
            div.innerHTML = `
                <span>${emp.username}</span>
                <div>
                    <button onclick="deleteEmployee('${emp.username}')">Изтрий</button>
                </div>
            `;
            employeesList.appendChild(div);
        });
    }

    window.deleteEmployee = function(username) {
        if (!confirm(`Сигурен ли си, че искаш да изтриеш ${username}?`)) return;

        fetch(`/api/employees/${username}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => renderEmployees(data))
            .catch(err => console.error('Грешка при изтриване:', err));
    }
});