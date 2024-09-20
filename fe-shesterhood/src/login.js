document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.json();  // Parse error response dari server
            throw new Error(errorData.error || 'Login failed'); // Ambil pesan error dari server jika ada
        }

        const data = await response.json();
        console.log('Login successful:', data);

        // Simpan token di localStorage atau sessionStorage
        localStorage.setItem('token', data.token);

        // Redirect atau lakukan tindakan setelah login berhasil
        window.location.href = '/events.html'; // Sesuaikan dengan halaman tujuan Anda

    } catch (error) {
        console.error('Error logging in:', error);
        // Tampilkan error ke pengguna
        document.getElementById('error-message').textContent = error.message;
        document.getElementById('error-message').classList.remove('hidden');
    }
});
