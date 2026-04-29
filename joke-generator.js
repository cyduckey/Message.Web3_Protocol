const fetch = require('node-fetch');

class JokeGenerator {
    constructor() {
        this.apiUrl = 'https://official-joke-api.appspot.com/random_joke';
    }

    async fetchJoke() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const joke = await response.json();
            return `${joke.setup} - ${joke.punchline}`;
        } catch (error) {
            console.error('Error fetching joke:', error);
        }
    }

    async fetchMultipleJokes(count) {
        const jokes = [];
        for (let i = 0; i < count; i++) {
            const joke = await this.fetchJoke();
            if (joke) {
                jokes.push(joke);
            }
        }
        return jokes;
    }
}

// Example usage:
const jokeGen = new JokeGenerator();
 jokeGen.fetchMultipleJokes(5).then(jokes => console.log(jokes));
