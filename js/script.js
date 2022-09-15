const pokemonName = document.querySelector('.pokemon-name');
const pokemonID = document.querySelector('.pokemon-id');
const pokemonImage = document.querySelector('.pokemon-image');

const search = document.querySelector('.search');
const searchInput = document.querySelector('.search-input');

const audioEffect = document.getElementById('audio-effect');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async(pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data
    }

}

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'Loading...';
    pokemonID.innerHTML = '';
    audioEffect.play();

    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonName.innerHTML = data.name;
        pokemonID.innerHTML = data.id;
        pokemonImage.src = data['sprites'] ['versions'] ['generation-v'] ['black-white'] ['animated'] ['front_default'];
        searchInput.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.src = './images/not-found.gif';
        pokemonName.innerHTML = 'Not found';
        pokemonID.innerHTML = searchInput.value;
    }
}

search.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(searchInput.value.toLowerCase());
} );

btnNext.addEventListener('click', () => {
    searchPokemon +=1;
    renderPokemon(searchPokemon)
} );
btnPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -=1;
        renderPokemon(searchPokemon)
        
    }
} );

renderPokemon('1');