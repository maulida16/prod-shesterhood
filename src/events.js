document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('eventsTableBody');

    // Memeriksa token dan mengarahkan pengguna jika token tidak ada
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html'; // Redirect jika tidak ada token
        return;
    }

    // Opsional: Verifikasi token dengan backend
    fetch('/api/verify-token', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
        if (!response.ok) {
            window.location.href = '/login.html'; // Redirect jika token tidak valid
        }
    })
    .catch(() => {
        window.location.href = '/login.html'; // Redirect jika terjadi kesalahan
    });

    // Deklarasi objek untuk menyimpan kategori dan subkategori
    let categories = {};
    let subcategories = {};

    async function fetchCategories() {
        try {
            const response = await fetch('/api/categories', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                categories = data.reduce((acc, item) => {
                    acc[item.id] = item.name;
                    return acc;
                }, {});
                console.log('Categories fetched:', categories); // Log data kategori
            } else {
                console.error('Failed to fetch categories:', response.status);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    async function fetchSubcategories() {
        try {
            const response = await fetch('/api/subcategories', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                subcategories = data.reduce((acc, item) => {
                    acc[item.id] = item.name;
                    return acc;
                }, {});
                console.log('Subcategories fetched:', subcategories); // Log data subkategori
            } else {
                console.error('Failed to fetch subcategories:', response.status);
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    }

    function formatDate(dateString) {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }    

    async function fetchEvents() {
        try {
            const response = await fetch('/api/events', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Network response was not ok.');
            const events = await response.json();
    
            tableBody.innerHTML = events.map(event => `
                <tr data-id="${event.id}">
                    <td class="p-4 border-b">${event.id}</td>
                    <td class="p-4 border-b">${event.title}</td>
                    <td class="p-4 border-b">${event.caption}</td>
                    <td class="p-4 border-b">${formatDate(event.date)}</td>
                    <td class="p-4 border-b">${event.Category ? event.Category.name : 'Unknown Category'}</td>
                    <td class="p-4 border-b">${event.Subcategory ? event.Subcategory.name : 'Unknown Subcategory'}</td>
                    <td class="p-4 border-b action-buttons">
                        <button class="edit-btn">
                            <img src="../public/image/edit-icon.svg" alt="Edit" class="w-6 h-6">
                        </button>
                        <button class="delete-btn">
                            <img src="../public/image/delete-icon.svg" alt="Delete" class="w-6 h-6">
                        </button>
                    </td>
                </tr>
            `).join('');
            
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }    

    async function init() {
        await fetchCategories();
        await fetchSubcategories();
        fetchEvents();
    }

    init();

    function editEvent(id) {
        console.log('Edit event with ID:', id);
        window.location.href = `editEvents.html?id=${id}`;
    }
    
    // Fungsi untuk menghapus event dengan konfirmasi
    async function deleteEvent(eventId) {
    // Tampilkan konfirmasi
    const isConfirmed = confirm('Are you sure you want to delete this event?');
    
    if (!isConfirmed) {
        return; // Jika pengguna membatalkan, keluar dari fungsi
    }

    try {
        const response = await fetch(`/api/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            alert('Event deleted successfully!');
            window.location.reload(); // Refresh halaman setelah berhasil dihapus
        } else {
            console.error('Failed to delete event:', response.status);
            alert('Failed to delete event.');
        }
    } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event.');
    }
    }

    // Tambahkan event listener untuk tombol delete
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const eventId = e.target.dataset.eventId;
            deleteEvent(eventId);
        });
    });

    // Menambahkan event listeners untuk tombol edit dan delete
    tableBody.addEventListener('click', (event) => {
        console.log('Event target:', event.target); // Log event target
        if (event.target.closest('.edit-btn')) {
            const id = event.target.closest('tr').dataset.id;
            console.log('Edit button clicked with ID:', id);
            editEvent(id);
        }
        if (event.target.closest('.delete-btn')) {
            const id = event.target.closest('tr').dataset.id;
            console.log('Delete button clicked with ID:', id);
            deleteEvent(id);
        }
    });
});
