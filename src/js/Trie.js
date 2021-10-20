class Node {
  /**
   * Creates a Node
   * @return {Object} Node
   */
  constructor() {
    // this.prefixes = 0;
    this.end = false; // This denotes the end of the word if true
    this.children = {}; // This is where we will be storing the nodes / Tries
  }
}

export default class Trie {
  /**
   * Creates a Trie
   * @return {Object} Trie
   */
  constructor() {
    this.root = new Node();
  }

  /**
   * Insert a string into the Trie using Recursion
   * @param {String} str String to add to the Trie
   * @param {Number} idx Index of current character of string
   * @param {Object} node Current Node that insert method is starting from
   * @returns {}
   */
  insert(str, idx = 0, node = this.root) {
    // BASE CASE:
    // If index is equal to the length of the string
    //  traversal through the whole string is complete, exit
    if (idx === str.length) {
      node.end = true;
      return;
    }

    // RECURSIVE CASE:
    // Create a key to hold the character of the string at the current index
    // Use the toLowerCase() method to ensure the character is always lower case
    let key = str.toLowerCase()[idx];

    // If the key does not exist in the current Node's children,
    // Add a new key-value pair to the current Node
    // The key is the key variable declared above and the value is a new Node
    if (!node.children[key]) {
      node.children[key] = new Node();
    }

    // Recursively call the insert method on the child object of the current Node
    this.insert(str, ++idx, node.children[key]);
  }

  /**
   * Insert a string into the Trie iteratively
   * @param {String} str String to add to the Trie
   * @returns {}
   */
  insertIter(str) {
    // Edge Case: Check if string is empty or not
    if (str.length === 0) {
      return;
    }

    // Set a pointer to the current Trie
    let ptr = this.root;

    // Traverse the characters in the string and insert them into the Trie
    for (const char of str) {
      // If char is not a direct child of the current Node,
      //  insert a new Node into the children of the current Trie
      //  set the key as char and the value as the new Node
      if (!ptr.children[char]) {
        ptr.children[char] = new Node();
      }

      // Update the pointer to point to the node containing char
      ptr = ptr.children[char];
    }

    // After iterating through the characters in the string,
    // flip the end property to true
    ptr.end = true;
  }

  /**
   * Return a list of all words that exist in the Trie
   * @param {String} [currentWord=""] Current word that is being accessed from Trie
   * @param {Array} [words=[]] List of all words in the Trie
   * @param {Object} [node=this.root] Reference to the current node in the trie
   * @returns {Array} List of words in the trie
   */
  getAllWords(currentWord = "", words = [], node = this.root) {
    // BASE CASE:
    // If we reach the end of a string,
    //  add the currentWord to the words array
    if (node.end) {
      words.push(currentWord);
    }

    // RECURSIVE CASE:
    // Traverse each child node in the Trie
    for (const letter in node.children) {
      // Recursively call the getAllWords method
      // Pass in the contatenation of letter to the currenWord argument
      // Pass in the reference to the current node
      this.getAllWords(currentWord + letter, words, node.children[letter]);
    }

    return words;
  }

  /**
   * Check whether or not a string exists within the Trie
   * @param {String} str string to search for inside Trie
   * @returns {Boolean} returns true if string exists, returns false otherwise
   */
  contains(str) {
    // Create a pointer to the current node
    let currentNode = this.root;

    // Create a variable containing a boolean value
    let exists = true;

    // Traverse the nodes using the characters of the string
    for (const letter of str) {
      // If the current letter exists as a key in the children object
      //  continue to the next node
      if (letter in currentNode.children) {
        currentNode = currentNode.children[letter];
      }
      // Otherwise, set exists to false
      else {
        exists = false;
      }
    }
    return exists;
  }

  // TODO: how to actually remove a word from the Trie?
  /**
   * Remove a word from the trie
   * @param {String} str Word to remove from the trie
   * @param {Number} idx Index of current character of string
   * @param {Object} node Reference to current node in Trie
   * @returns {}
   */
  remove(str, idx = 0, node = this.root) {
    // EDGE CASE: If string does not exist inside Trie, exit
    if (!this.contains(str)) {
      return -1;
    }

    // BASE CASE:
    // If index is equal to the length of the string
    //  traversal through the whole string is complete
    //  swap the end property of the current node to false
    if (idx === str.length) {
      node.end = false;
      return;
    }

    // RECURSIVE CASE:
    // Create a key to hold the character of the string at the current index
    // Use the toLowerCase() method to ensure the character is always lower case
    let key = str.toLowerCase()[idx];

    // If the current node has a child,
    // Recursively call the insert method on the child object of the current Node
    if (node.children[key]) {
      this.remove(str, ++idx, node.children[key]);
    }
  }

  /**
   * Obtain a list of words in the Trie that starts with the string input provided
   * @param {String} str substring to use to match against words in Trie
   * @returns {Array} array of words which start with the input string
   */
  autoComplete(str) {
    // EDGE CASE: If str is empty, return
    if (str === "") return -1;

    // Extract all the words in the Trie using the getAllWords method
    const allWords = this.getAllWords();

    // Initialize an empty array to store all words that start with str
    const autoCompleteWords = [];

    // Iterate through all words in the Trie and push words which start with str
    // to the empty array
    allWords.forEach((word) => {
      if (word.startsWith(str.toLowerCase())) {
        autoCompleteWords.push(word);
      }
    });
    return autoCompleteWords;
  }

  /**
   * Recursively obtain a list of words in the Trie
   * that starts with the string input provided
   * @param {String} str string to autoComplete
   * @param {Number} idx index of current position on string
   * @param {Object} node current node in the Trie
   * @returns {Array} array of words auto completed from str
   */
  autoCompleteRecurse(str, idx = 0, node = this.root) {
    // EDGE CASE: If str is empty, return
    if (str === "") return "Please enter a valid string";

    // Store the current character of the string based on the index
    const char = str[idx];

    // Create a pointer to the current child node containing char as a key
    const child = node.children[char];

    // BASE CASE:
    // When idx reaches end of the input string,
    // return object with prev string entered and all the words to show autoComplete
    // getAllWords will continue traversing the path where str ends and return any additional words if there are any
    if (idx === str.length - 1) {
      return this.getAllWords(str, [], child);
    }

    // RECURSIVE CASE:
    // Recursively call method when we haven't checked for all char in the string yet
    // This allows us to keep traversing down the nodes in the path of str
    return this.autoCompleteRecurse(str, ++idx, child);
  }

  /**
   * Utility method to print out Trie in the Console
   */
  print() {
    console.log(JSON.stringify(this, null, 2));
  }
}
