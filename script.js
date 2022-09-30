const pokeList = document.querySelector("#pokeList");
const moveList = document.querySelector(".container_moves-moveList");
const spriteContainer = document.querySelector(".container_moves-imgContainer")
const titleContainer = document.querySelector(".container_moves-imgContainer-title")

// fetch pokeMoves 
const fetchMoves = async (pokeName) => {
  try {
    moveList.innerHTML = "<h2>Loading...</h2>";
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    const data = await response.json();

    // clear current moves
    moveList.innerHTML = "";

    // create moves list 
    data.moves.map(moveObj => {
      const li = document.createElement("li");
      li.innerText = moveObj.move.name;
      moveList.append(li);
    })

    // check to see if img already exists 
    const spriteURL = data.sprites.front_default;
    const isSprite = document.querySelector("#pokeSprite");
    const isDisplayName = document.querySelector("#displayName");

    // create img and pokemon name 
    const displayName = document.createElement("h3");
    const spriteImg = document.createElement("img");

    // pokemon name element attributes/modification
    displayName.setAttribute("id", "displayName");
    displayName.innerText = data.name;

    // sprite image element modification
    spriteImg.setAttribute("src", spriteURL);
    spriteImg.setAttribute("id", "pokeSprite");

    // if element exists, replace element
    if (isDisplayName) {
      isDisplayName.replaceWith(displayName);
    }
    if (isSprite) {
      isSprite.replaceWith(spriteImg);
      return
    }

    // else append element 
    titleContainer.append(displayName);
    spriteContainer.append(spriteImg);

  } catch (error) {
    console.error(error);
    moveList.textContent = "";
    moveList.innerHTML = "<h2>Sorry, something went wrong</h2>"
  }

}

// Render pokemon names list 
const fetchPoke = async () => {
  try {
    pokeList.innerHTML = "<h2>Loading...</h2>"
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
    const { results } = await response.json();
    pokeList.innerHTML = ""
    results.map(pokemon => {

      // create pokemon button and add functionality 
      const but = document.createElement("button");
      but.innerText = pokemon.name
      but.setAttribute("id", pokemon.name);
      but.addEventListener("click", (e) => {
        fetchMoves(pokemon.name);
      })
      pokeList.append(but);
    })

  } catch (error) {
    console.error(error);
    moveList.textContent = "";
    moveList.innerHTML = "<h2>Sorry, something went wrong</h2>"
  }
}

fetchPoke();

