import Letter from './src/Letter.js'

// Main code
const letter = new Letter()
const responseJson = await letter.get()

console.log(responseJson)
