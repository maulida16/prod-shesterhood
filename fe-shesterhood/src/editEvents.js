document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('editEventForm');
    const eventIdInput = document.getElementById('eventId');
    const titleInput = document.getElementById('title');
    const captionInput = document.getElementById('caption');
    const dateInput = document.getElementById('date');
    const categorySelect = document.getElementById('category');
    const subcategorySelect = document.getElementById('subcategory');
    const registrationLinkInput = document.getElementById('registrationLink');

    // Memeriksa token dan mengarahkan pengguna jika token tidak ada
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html'; // Redirect jika tidak ada token
        return;
    }

    // Mendapatkan ID event dari query string
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    if (!eventId) {
        alert('Event ID is missing!');
        window.location.href = '/events.html';
        return;
    }

    async function fetchEventDetails() {
        try {
            const response = await fetch(`/api/events/${eventId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const event = await response.json();
                eventIdInput.value = event.id;
                titleInput.value = event.title;
                captionInput.value = event.caption;
                dateInput.value = event.date.split('T')[0]; // Format date untuk input date
                registrationLinkInput.value = event.registrationLink;
                await populateDropdowns(event.categoryId, event.subcategoryId);
            } else {
                console.error('Failed to fetch event details:', response.status);
                alert('Failed to load event details.');
                window.location.href = '/events.html';
            }
        } catch (error) {
            console.error('Error fetching event details:', error);
            alert('Error loading event details.');
            window.location.href = '/events.html';
        }
    }

    async function populateDropdowns(selectedCategoryId, selectedSubcategoryId) {
        try {
            // Ambil data kategori dari API
            const categoriesResponse = await fetch('/api/categories', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
            const categories = await categoriesResponse.json();
            categorySelect.innerHTML = categories.map(cat => 
                `<option value="${cat.id}" ${cat.id === selectedCategoryId ? 'selected' : ''}>${cat.name}</option>`
            ).join('');
            
            // Ambil data subkategori berdasarkan kategori yang dipilih
            const fetchSubcategories = async (categoryId) => {
                const subcategoriesResponse = await fetch(`/api/subcategories?categoryId=${categoryId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!subcategoriesResponse.ok) throw new Error('Failed to fetch subcategories');
                const subcategories = await subcategoriesResponse.json();
                subcategorySelect.innerHTML = subcategories.map(sub => 
                    `<option value="${sub.id}" ${sub.id === selectedSubcategoryId ? 'selected' : ''}>${sub.name}</option>`
                ).join('');
            };

            categorySelect.addEventListener('change', (event) => {
                fetchSubcategories(event.target.value);
            });

            // Trigger change event to populate subcategories
            if (selectedCategoryId) {
                fetchSubcategories(selectedCategoryId);
            }
        } catch (error) {
            console.error('Error populating dropdowns:', error);
        }
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {
            title: formData.get('title'),
            caption: formData.get('caption'),
            date: formData.get('date'),
            categoryId: formData.get('category'),
            subcategoryId: formData.get('subcategory'),
            registrationLink: formData.get('registrationLink')
        };
        try {
            const response = await fetch(`/api/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert('Event updated successfully!');
                window.location.href = '/events.html';
            } else {
                console.error('Failed to update event:', response.status);
                alert('Failed to update event.');
            }
        } catch (error) {
            console.error('Error updating event:', error);
            alert('Error updating event.');
        }
    });

    fetchEventDetails();
});
