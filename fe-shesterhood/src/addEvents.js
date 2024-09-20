document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addEventForm');
    const categorySelect = document.getElementById('categoryId');
    const subcategorySelect = document.getElementById('subcategoryId');

    // Mendapatkan token dari localStorage
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/login.html'; // Redirect jika token tidak ada
        return;
    }

    let categories = {};
    let subcategories = {};

    // Mengambil kategori dari API
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
                populateCategoryDropdown();
            } else {
                console.error('Failed to fetch categories:', response.status);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    // Mengambil subkategori dari API
    async function fetchSubcategories() {
        try {
            const response = await fetch('/api/subcategories', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                subcategories = data.reduce((acc, item) => {
                    if (!acc[item.categoryId]) {
                        acc[item.categoryId] = [];
                    }
                    acc[item.categoryId].push({ id: item.id, name: item.name });
                    return acc;
                }, {});
            } else {
                console.error('Failed to fetch subcategories:', response.status);
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    }

    // Mengisi dropdown kategori
    function populateCategoryDropdown() {
        categorySelect.innerHTML = Object.entries(categories)
            .map(([id, name]) => `<option value="${id}">${name}</option>`)
            .join('');
    }

    // Mengisi dropdown subkategori berdasarkan kategori yang dipilih
    function populateSubcategoryDropdown(categoryId) {
        if (subcategories[categoryId]) {
            subcategorySelect.innerHTML = subcategories[categoryId]
                .map(subcategory => `<option value="${subcategory.id}">${subcategory.name}</option>`)
                .join('');
        } else {
            subcategorySelect.innerHTML = '<option value="">Select subcategory</option>';
        }
    }

    // Event listener untuk mengupdate subkategori ketika kategori dipilih
    categorySelect.addEventListener('change', (e) => {
        const selectedCategoryId = e.target.value;
        populateSubcategoryDropdown(selectedCategoryId);
    });

    // Event listener untuk submit form
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Ambil data dari form
        const formData = new FormData(form);

        // Print semua field dari FormData
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // Tidak perlu 'Content-Type' header di sini karena FormData akan mengaturnya
                },
                body: formData
            });

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                if (response.ok) {
                    alert('Event added successfully!');
                    window.location.href = '/events.html'; // Redirect setelah berhasil
                } else {
                    alert(`Failed to add event: ${result.error.message}`);
                }
            } else {
                const text = await response.text();
                console.error('Unexpected response:', text);
                alert('Failed to add event: Unexpected response from server');
            }
        } catch (error) {
            console.error('Error adding event:', error);
            alert('Failed to add event');
        }
    });

    // Inisialisasi
    async function init() {
        await fetchCategories();
        await fetchSubcategories();
    }

    init();
});
