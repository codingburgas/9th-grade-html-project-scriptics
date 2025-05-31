const username = localStorage.getItem('username');
if (username) {
    const msg = document.createElement('p');
    msg.textContent = `Потребител: ${username}`;
    msg.style.marginTop = '15px';
    msg.style.fontWeight = 'bold';
    document.body.appendChild(msg);
}