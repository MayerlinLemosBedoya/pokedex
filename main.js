const pokemonList= document.getElementById("pokemonList")
const pokemonDetail=document.getElementById("pokemonDetail")
const backtoPokedexBtn=document.getElementById("backToPokedexBtn")
const pokemonInfo = document.getElementById("pokemonInfo")

async function fetchPokemonData(pokemonId){
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
     //"https://pokeapi.co/api/v2/pokemon/"+pokemonId
     const data=  await response.json()
     return data
    } catch (error) {
       console.error(error)
       return false 
    }
}
function displayPokemon(pokemon){
   const pokemonCard=document.createElement("div")
    pokemonCard.classList.add("pokemon-card")
   // console.log(pokemon.sprites.front)
    pokemonCard.innerHTML=`
   <h2>${pokemon.id}</h2>
    <img src="${pokemon.sprites.front_shiny}" alt="imagen de${pokemon.name}">
    <h3>${pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}</h3>


`
pokemonCard.addEventListener("click",()=>showPokemonDetail(pokemon))
  pokemonList.appendChild(pokemonCard)
}
function showPokemonDetail(pokemon){
    pokemonList.style.display="none"
    pokemonDetail.style.display="flex"
    //-----codigo para obtener los stats--------
    console.log(pokemon.stats)
    let stats =""
      for(let i=0;i<pokemon.stats.length;i++){
      stats=stats + pokemon.stats[i].stat.name +"<br>"
      }
    //--------codigo para obtener los tipos-------
    let types=" "
    for(let i=0;i<pokemon.types.length;i++){
        types=types +pokemon.types[i].type.name + "<br>"
    }
    pokemonInfo.classList.add(`${pokemon.types[0].type.name}`)
    pokemonInfo.innerHTML=`
        <h2>${pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}</h2>
    <p>${types}</p>
    <p>${stats}</p>
    `
}
backtoPokedexBtn.addEventListener("click",()=>{
 pokemonList.style.display="grid"
 pokemonDetail.style.display="none"
})
async function loadpokdex(){
 for(let i=1;i<=52;i++){  
    const pokemon= await fetchPokemonData(i)
    displayPokemon(pokemon)
}
}

loadpokdex()
