//Variaveis globais
const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

//função que busca os pokemons no servidor, faz o get da api

const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )

  const data = await APIResponse.json()
  return data
}

//Função que renderiza o pokemon na tela

const renderPokemon = async pokemon => {
  const data = await fetchPokemon(pokemon)

  pokemonName.innerHTML = data.name //retorna nome
  pokemonNumber.innerHTML = data.id //retorna id
  pokemonImage.src =
    data['sprites']['versions']['generation-v']['black-white']['animated'][
      'front_default'
    ] //retorna sprite
}

renderPokemon('123')
