const chalk = require("chalk");
const fs = require("fs");

const addNote =  (title, body) => {
  const notes = loadNotes();
  const checkTitle = notes.find((note) => note.title === title);
  if (!checkTitle) {
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

const listNotes = ()=> {
    const notes = loadNotes();
    console.log(chalk.yellow('Vos notes :'));
    notes.forEach(element => {
        console.log("\t-",element.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if(note){
        console.log(chalk.green.inverse("TROUVÉ !!"));
        console.log(chalk.yellow("Titre :", note.title));
        console.log("\t", note.body );

    }
    else
        console.log(chalk.red("Aucun élément trouvé"));
}

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
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote:readNote,
};
