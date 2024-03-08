//Variaveis globais
const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

//Variaveis da busca
const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

//função que busca os pokemons no servidor, faz o get da api
const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
  )

  if (APIResponse.status === 200) {
    //so vai retornar se encontrar o pokemon
    const data = await APIResponse.json()
    return data
  }
}

//Função que renderiza o pokemon na tela
const renderPokemon = async pokemon => {
  pokemonName.innerHTML = 'Loading...'

  const data = await fetchPokemon(pokemon)

  if (data) {
    //so vai mostrar os dados caso o data tenha um pokemon
    pokemonName.innerHTML = data.name //retorna nome
    pokemonNumber.innerHTML = data.id //retorna id
    pokemonImage.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ] //retorna sprite

    input.value = ''
  } else {
    pokemonName.innerHTML = 'Not found :('
    pokemonNumber.innerHTML = ''
    pokemonImage.src = null
  }
}

form.addEventListener('submit', event => {
  event.preventDefault()

  renderPokemon(input.value)
})

renderPokemon('1')
