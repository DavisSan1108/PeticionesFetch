let currentPokemonId = null;

function searchPokemon() {
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    fetchPokemon(pokemonName);
}

function fetchPokemon(nameOrId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`)
        .then(response => response.json())
        .then(data => {
            currentPokemonId = data.id;
            displayPokemon(data);
            document.getElementById('previous-button').disabled = currentPokemonId <= 1;
            document.getElementById('next-button').disabled = false;
        })
        .catch(error => {
            document.getElementById('pokemon-info').textContent = 'Pokémon no encontrado.';
            document.getElementById('pokemon-image').src = '';
        });
}

function displayPokemon(data) {
    document.getElementById('pokemon-image').src = data.sprites.front_default;
    document.getElementById('pokemon-info').textContent = `
        Nombre: ${data.name.toUpperCase()}
        Tipo: ${data.types.map(type => type.type.name).join(', ')}
        Altura: ${data.height / 10} m
        Peso: ${data.weight / 10} kg
    `;
}

function previousPokemon() {
    if (currentPokemonId > 1) {
        fetchPokemon(currentPokemonId - 1);
    }
}

function nextPokemon() {
    fetchPokemon(currentPokemonId + 1);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchPokemon(1);  // Carga el primer Pokémon al iniciar
});
