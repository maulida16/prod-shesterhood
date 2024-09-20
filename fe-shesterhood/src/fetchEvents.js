document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');

    async function fetchEvents() {
        try {
            const response = await fetch('http://localhost:8080/api/public-events');
            if (!response.ok) throw new Error('Network response was not ok.');
            const events = await response.json();

            //console.log(events); // Debugging, cek data yang diterima

            // Render event cards
            cardContainer.innerHTML = events.map(event => `
                <div class="px-3 py-4 lg:px-8 lg:py-6 bg-white rounded-3xl">
                    <img src="${event.imagePath}" alt="" class="mb-4 lg:mb-8">
                    <div class="flex mb-4 lg:mb-8 gap-3 lg:gap-2">
                        <!-- Tampilkan kategori dan subkategori -->
                        <div class="bg-pink drop-shadow-sm px-2 py-1 lg:px-8 lg:py-3 text-sm font-medium text-white rounded-full">
                            ${event.Category || 'Unknown Category'}
                        </div>
                        <div class="bg-green drop-shadow-sm px-2 py-1 lg:px-8 lg:py-3 text-sm font-medium text-white rounded-full">
                            ${event.Subcategory || 'Unknown Subcategory'}
                        </div>
                    </div>
                    <h1 class="text-xl font-bold text-black mb-1">${event.title}</h1>
                    <h2 class="text-lg font-bold text-grey2 mb-1">
                        ${new Date(event.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </h2>
                    <p class="text-sm font-normal text-grey2 mb-4">${event.caption}</p>
                    <button class="bg-orange drop-shadow-sm px-6 py-3 lg:px-6 lg:py-4 text-lg font-bold text-white w-full rounded-full">
                        <a href="${event.registrationLink}" target="_blank" rel="noopener noreferrer">Book Now!</a>
                    </button>
                </div>
            `).join(''); // Menggabungkan semua cards menjadi satu string HTML
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    fetchEvents(); // Memanggil fungsi untuk fetch dan render event cards
});
