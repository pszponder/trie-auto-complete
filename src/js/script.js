// ============
// IMPORT FILES
// ============

// Import list of countries
import countries from "./countries.js";

// Import Trie Data Structure
import Trie from "./Trie.js";

// =========
// VARIABLES
// =========
// Input field (search box)
const search = document.querySelector(".input__input");

// Countries Container (where newly generated elements will be placed)
const countriesContainer = document.querySelector(".output__countries");

// ===================
// TRIE DATA STRUCTURE
// ===================

// Instantiate the trie data structure
const trie = new Trie();

// Load data from countries array to trie data structure
countries.forEach((obj) => {
  trie.insert(obj.name.toLocaleLowerCase());
});

// ====================
// SEARCH FUNCTIONALITY
// ====================
// Create a helper function to capitalize the 1st letter of every word
function capitalizeFirstLetter(str) {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

// Create a search handler function
function handleSearch(event) {
  // Extract the value from the input
  const input = event.currentTarget.value;

  // Call the autoComplete method using input
  const results = trie.autoComplete(input);

  // Remove all current elements from countriesContainer
  countriesContainer.innerHTML = "";

  // Iterate through each element (country) in the results array if results is value
  if (results !== -1) {
    results.forEach((country) => {
      // Create a new element for each country and append it the countriesContainer
      const newDiv = document.createElement("div");

      // Add the output__country class to the element
      newDiv.classList.add("output__country");

      // Add the country as the innerText to the new div element
      // newDiv.innerText = country[0].toUpperCase() + country.slice(1);
      newDiv.innerText = capitalizeFirstLetter(country);

      // Append the newly created div element to the countriesContainer DOM element
      countriesContainer.appendChild(newDiv);
    });
  }
}

// Add event listener (on key up) to search field
search.addEventListener("keyup", handleSearch);
