const API_URL = 'http://localhost:3000/api/auth'; // Replace with your backend API URL

document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            alert('User registered successfully!');
        } else {
            const error = await response.json();
            alert('Error: ' + error.message);
        }
    } catch (err) {
        console.error('Error:', err);
    }
});

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Login successful!');
            console.log('Access Token:', data.accessToken);
            console.log('Refresh Token:', data.refreshToken);
        } else {
            const error = await response.json();
            alert('Error: ' + error.message);
        }
    } catch (err) {
        console.error('Error:', err);
    }
});
