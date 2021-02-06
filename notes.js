const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => "Your notes ...";

const addNote = (note) => {
  const notes = loadNotes();

  const duplicateNotes = notes.filter((n) => n.title === note.title);

  debugger;

  if (duplicateNotes.length === 0) {
    notes.push(note);
    fs.writeFileSync("notes.json", JSON.stringify(notes));
  } else {
    console.log("note with the same title exists already");
  }
};

const loadNotes = () => {
  try {
    const notesBuffer = fs.readFileSync("notes.json");
    const notesJSON = JSON.parse(notesBuffer.toString());

    return notesJSON;
  } catch (error) {
    return [];
  }
};

const removeNote = (noteTitle) => {
  const notes = loadNotes();

  let index = -1;
  notes.forEach((note, i) => {
    if (note.title === noteTitle) index = i;
  });

  if (index >= 0) {
    notes.splice(index, 1);
    fs.writeFileSync("notes.json", JSON.stringify(notes));
    console.log(chalk.bgGreen("Note removed!"));
  } else console.log(chalk.bgRed("No note found"));
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue("Your notes"));
  notes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((n) => n.title === title);

  note
    ? console.log(chalk.blue.inverse(note.title) + " : " + note.body)
    : console.log(chalk.red("No note found!"));
};

module.exports = { getNotes, addNote, removeNote, listNotes, readNote };
