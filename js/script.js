//Variaveis globais
const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

//Variaveis da busca
const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

//Variaveis dos botoes
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

//variavel para auxiliar na contagem dos pokemons para os botoes de prev e next
let searchPokemon = 1

//função que busca os pokemons no servidor, faz o get da api
const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
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
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name //retorna nome
    pokemonNumber.innerHTML = data.id //retorna id
    searchPokemon = data.id //faz a variavel pegar a id que pesquisamos
    pokemonImage.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ] //retorna sprite

    input.value = ''
  } else {
    pokemonName.innerHTML = 'Not found :('
    pokemonNumber.innerHTML = ''
    pokemonImage.style.display = 'none'
  }
}

form.addEventListener('submit', event => {
  event.preventDefault()

  renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
})

buttonNext.addEventListener('click', () => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)
