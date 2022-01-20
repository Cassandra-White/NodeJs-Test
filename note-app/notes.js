const chalk = require('chalk');
const fs = require('fs');


const getNotes = function () {
    return "votre note :"
}

const addNotes = function(title, body ) {
    const notes = loadNotes();
    const checkTitle = notes.filter(function (note){
        return note.title === title
    })

    if(checkTitle.length === 0){
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes );
        console.log(chalk.green.inverse('INFO :'), chalk.green('Note ajouté à notes.json'))
    }
    else {
        console.log(chalk.red.inverse('ERROR:'), chalk.red('Titre déjà utilisé'))
    }



}

const saveNotes = function(notes) {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", notesJSON);
}

const loadNotes = function(){
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return []
    }
    
}

module.exports = {
    getNotes: getNotes,
    addNotes:addNotes,
}