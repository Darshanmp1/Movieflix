document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    // Clear previous messages
    messageDiv.className = 'message';
    messageDiv.textContent = '';

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
            
            messageDiv.className = 'message success';
            messageDiv.textContent = data.message;

            // Redirect to movies page after 1 second
            setTimeout(() => {
                window.location.href = '/movies';
            }, 1000);
        } else {
            messageDiv.className = 'message error';
            messageDiv.textContent = data.message;
        }
    } catch (error) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'An error occurred. Please try again.';
        console.error('Login error:', error);
    }
});
