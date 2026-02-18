document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    // Clear previous messages
    messageDiv.className = 'message';
    messageDiv.textContent = '';

    // Basic validation
    if (password.length < 6) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Password must be at least 6 characters long';
        return;
    }

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, name, email, phone, password })
        });

        const data = await response.json();

        if (data.success) {
            messageDiv.className = 'message success';
            messageDiv.textContent = data.message;

            // Clear form
            document.getElementById('registerForm').reset();

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            messageDiv.className = 'message error';
            messageDiv.textContent = data.message;
        }
    } catch (error) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'An error occurred. Please try again.';
        console.error('Registration error:', error);
    }
});
