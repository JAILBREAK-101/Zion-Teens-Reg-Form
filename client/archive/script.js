document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;

    // Password hashing example (for production, handle on the server-side)
    const passwordHash = btoa(password); 

    // Generate QR code (using an API)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(email)}&size=100x100`;
    document.getElementById('qrCode').innerHTML = `<img src="${qrCodeUrl}" alt="QR Code" />`;

    // Post data to the server (simulated here)
    console.log({ username, email, passwordHash, dob, qrCodeUrl });
});

fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, passwordHash, dob, qrCodeUrl })
})
.then(response => response.json())
.then(data => console.log('User registered:', data))
.catch(error => console.error('Error:', error));
