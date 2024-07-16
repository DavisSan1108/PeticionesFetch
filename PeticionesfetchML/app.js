document.addEventListener('DOMContentLoaded', () => {
    fetchData('ordenadores');
});

function fetchData(query) {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
        .then(response => response.json())
        .then(data => displayResults(data.results))
        .catch(error => console.error('Error:', error));
}

function displayResults(results) {
    const resultList = document.getElementById('result-list');
    resultList.innerHTML = '';  // Limpiar cualquier contenido previo
    results.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
            <div class="card">
                <img src="${item.thumbnail}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">Precio: $${item.price}</p>
                    <a href="${item.permalink}" target="_blank" class="btn btn-primary">Ver más</a>
                </div>
            </div>
        `;
        resultList.appendChild(col);
    });
}

function searchProducts() {
    const query = document.getElementById('search-query').value;
    if (query) {
        fetchData(query);
    }
}
