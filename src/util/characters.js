const CHARACTER_NAMES = ['Falcon', 'Donkey Kong', 'Fox', 'Mr. Game & Watch', 'Kirby', 'Bowser', 'Link', 'Luigi', 'Mario', 'Marth', 'Mewtwo', 'Ness', 'Peach', 'Pikachu', 'Ice Climbers', 'Jigglypuff', 'Samus', 'Yoshi', 'Zelda', 'Sheik', 'Falco', 'Young Link', 'Dr. Mario', 'Roy', 'Pichu', 'Ganondorf'];

// const test = {
//     0: 'Falcon',
//     1: 'Donkey Kong'
// };

function getCharNameByIndex(index) {
    if (index >= 0 && index < 26) {
        return CHARACTER_NAMES[index];
    
    } else {
        console.log("Char Index out of bounds")
        return "Unknown";
    }
    
}

exports.getCharNameByIndex = getCharNameByIndex;