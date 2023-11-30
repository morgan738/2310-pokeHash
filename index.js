const pineappleButton = document.querySelector("#pineappleButton")
const nopeButton = document.querySelector("#nopeButton")
const nopeScore = document.querySelector("#nopeScore")
const pineappleScore = document.querySelector("#pineappleScore")
const clearButton = document.querySelector("#clearButton")

let goodScore = 0
let badScore = 0

pineappleButton.addEventListener("click", () => {
    //change innerHTML of score to reflect +1
    pineappleScore.innerHTML = goodScore += 1
})

nopeButton.addEventListener("click", () => {
    //change innerHTML of score to reflect +1
    nopeScore.innerHTML = badScore += 1
})

clearButton.addEventListener("click", () => {
    pineappleScore.innerHTML = 0
    nopeScore.innerHTML = 0
    goodScore = 0
    badScore = 0
})

//////////////////////////////////////////////////////////

const dataButton = document.querySelector("#dataButton")
const dataDiv = document.querySelector("#dataDiv")

dataButton.addEventListener("click", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1")
    const data = await response.json()
    console.log(data)
    dataDiv.innerHTML = `
        <div>
            <h1>${data.title}</h1>
        </div>
    `
})

//////////////////////////////////////////////////////////
const allPokeDiv = document.querySelector("#allPokeDiv")
const singlePokeDiv = document.querySelector('#singlePoke')
let pokemons = []

//add hashchange event listener to window
//fires in the event that the hash in our url changes
window.addEventListener("hashchange", () => {
    //every time our url changes, our user wants to look at a different pokemon
    //so we need to render again
    render()
})

//function to get all the pokemon
//async and await go together
async function getAllPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
    const data = await response.json()
    //"stores" the data we get from the server to our array
    pokemons = data.results
    render()
}

async function render () {
    //map over our list of all pokemon and make "html"
    const pokeList = pokemons.map((poke) => {
        //the <a> tag with href here is what changes our hash in the url
        return `<a href=#${poke.name} class="pokeItem"> ${poke.name} </a>`
    })
    
    //this lets us get information from our hash
    //i call slice() to get rid of the "#" in front of the name
    const name = window.location.hash.slice(1)
    
    //call find() to find the pokemon the user is looking for
    //we check to see if the name of the pokemon is same name from our hash
    const singlePoke = pokemons.find((poke) => {
        return poke.name === name
    })


    //ternary operator
    //basically says if we found a singlepokemon dont show the list of all pokemon
    //if we dont have a singlepokemon, show all the mokemon
    allPokeDiv.innerHTML = singlePoke ? "" : "<h1>All Pokemon <h1>" + `<div class="pokeContainer"> ${pokeList.join("")} </div>` 

    //if we do have a singlepokemon
    //we want to display detailed html about it
    //we need to make sure we only do this, if we actually have a singlepokemon
    if(singlePoke){
        //we need to make another call to the data for details about a single pokemon
        //this will not always be the case. it will depend on the backend
        //in this case, the pokemon api will give me detail only after i make a call to another endpoint
        const pokeData = await fetch(singlePoke.url)
        const singlePokeData = await pokeData.json()
        console.log(singlePokeData)

        //since i want to show the abilities and this is in an array,
        //i map over the abilities array and make some "html" from it
        const abilities = singlePokeData.abilities.map((ability) => {
            console.log(ability.ability.name)
            return `<p> ${ability.ability.name} </p>`
        })
        
        //this is where i show the details of a single pokemon
        singlePokeDiv.innerHTML = `
            <h1> Selected Pokemon </h1>
            <h2> ${singlePokeData.name} </h2>
            <img src= ${singlePokeData.sprites.back_default} />
            <h3> Abilities: </h3>
        ` + abilities.join("") + `
            <div> <a href=#> Back to all pokemon </a> </div>
        `

    }else{
        //if there is not singlepokemon selected, dont show anything
        singlePokeDiv.innerHTML = ""
    }




}

getAllPokemon()