const pokemon_id        = document.getElementById('pokemon-id');
const pokemon_name      = document.getElementById('pokemon-name');
const sprite            = document.getElementById('sprite-container');
const types             = document.getElementById('types');
const height            = document.getElementById('height');
const weight            = document.getElementById('weight');
const hp                = document.getElementById('hp');
const attack            = document.getElementById('attack');
const defense           = document.getElementById('defense');
const special_attack    = document.getElementById('special-attack');
const special_defense   = document.getElementById('special-defense');
const speed             = document.getElementById('speed');
const search_form       = document.getElementById('search-form');
const search_input      = document.getElementById('search-input');

async function get_pokemon() {
try {
    const search = search_input.value.toLowerCase();
    const api = await fetch
        (`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${search}`);
    const info = await api.json();

    pokemon_name.textContent    = `${info.name.toUpperCase()}`;
    pokemon_id.textContent      = `#${info.id}`;
    weight.textContent          = `Weight: ${info.weight}`;
    height.textContent          = `Height: ${info.height}`;
    sprite.innerHTML = // make images rotate/swap
        `<img id="sprite" width="200px"
        src="${info.sprites.front_default}"
        alt="image of ${info.name}">`;

    hp.textContent              = info.stats[0].base_stat;
    attack.textContent          = info.stats[1].base_stat;
    defense.textContent         = info.stats[2].base_stat;
    special_attack.textContent  = info.stats[3].base_stat;
    special_defense.textContent = info.stats[4].base_stat;
    speed.textContent           = info.stats[5].base_stat;

    types.innerHTML = info
        .types
        .map(obj => `<span>${obj.type.name}</span>`)
        .join(' ');
}
catch (error) {
    const sprite = document.getElementById('sprite');
    if (sprite) sprite.remove();

    pokemon_name.textContent      = '';
    pokemon_id.textContent        = '';
    types.innerHTML               = '';
    height.textContent            = '';
    weight.textContent            = '';
    hp.textContent                = '';
    attack.textContent            = '';
    defense.textContent           = '';
    special_attack.textContent    = '';
    special_defense.textContent   = '';
    speed.textContent             = '';

    alert('Pokémon not found');
    console.log(`Pokémon not found: ${error}`);
}
};

search_form.addEventListener('submit', event => {
    event.preventDefault();
    get_pokemon();
});
