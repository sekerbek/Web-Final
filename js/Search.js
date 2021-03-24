//here i added all the necessary var
const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];
//event keydown происходит при нажатии клавиши а keyup – при отпускании
searchBar.addEventListener('keyup', (e) => {
    // searchString means the name or price of games that i want to find, and e.target.value means inside of the console what i am typing
    const searchString = e.target.value.toLowerCase();

//already filtered Games, we return what it includes
    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.price.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});
//async function
const loadCharacters = async () => {
    try {
      //await - wainting for responce of fetch - where we bring the data
        const res = await fetch('http://my-json-server.typicode.com/sekerbek/MockJson/item');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
//  The map() method creates a new array with the results of calling a function for every array element.
    const htmlString = characters.map((character) => {
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>Price: ${character.price}</p>
                <img src="${character.image}"></img>
            </li>
        `;
        }).join('');//join() позволяет преобразовать и объединить все элементы массива в одно строковое значение
    charactersList.innerHTML = htmlString;//позволяет нам взять строки с веб в виде строки
};

loadCharacters();
