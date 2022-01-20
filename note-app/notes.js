const chalk = require("chalk");
const fs = require("fs");

const getNotes = () =>  {
  return "votre note :";
};

const addNote =  (title, body) => {
  const notes = loadNotes();
  const checkTitle = notes.filter((note) => note.title === title);
  if (checkTitle.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(
      chalk.green.inverse("INFO :"),
      chalk.green("Note ajouté à notes.json")
    );
  } else {
    console.log(chalk.red.inverse("ERROR:"), chalk.red("Titre déjà utilisé"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const checkTitle = notes.filter((note) => note.title !== title);
  if (checkTitle.length === notes.length)
    console.log(
      chalk.red.inverse("ERROR:"),
      chalk.red("Aucun élément supprimé")
    );
  else {
    saveNotes(checkTitle);
    console.log(
      chalk.green.inverse("INFO :"),
      chalk.green(`La note "${title}" à été supprimé de notes.json`)
    );
  }
};

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
};
