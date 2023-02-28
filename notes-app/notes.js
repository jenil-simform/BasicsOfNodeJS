const fs = require('fs');
const chalk = require("chalk");

//adding notes
const addNotes = (title, body) => {
    const notes = loadNotes();
    const isTitleExist = () => {
        const result = notes.find((note) => note.title === title)
        return result;
    }

    if (!isTitleExist() || notes.length == 0) {
        notes.push({
            title, body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('Note Added!'))
    } else {
        console.log(chalk.red.inverse("Title Already Exists, Please try different title!"))
    }
}


//saving notes
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}


//loading all notes and returning it.
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    }
    catch (e) {
        return [];
    }
}

//removing note by title of the note
const removeNote = (title) => {
    const notes = loadNotes();
    const index = notes.findIndex(note => note.title === title);

    if (index == -1) {
        console.log(chalk.red.inverse("Note doesn't exist!"))
        return;
    }
    const newNotes = notes.splice(0, index);
    console.log(chalk.green.inverse("Note successfully deleted with title : " + chalk.italic(title)));
    saveNotes(newNotes)
}


//listing out all notes
const listNotes = () => {
    const notes = loadNotes();

    if(notes.length == 0){
        console.log(chalk.red.inverse("Notes not found!"))
    }
    else{
        notes.forEach(note => console.log(chalk.inverse(note.title)))
    }
}


//reading specific note by title
const readNote = (title) => {
    const notes = loadNotes();

    const requiredNote = notes.find(note => note.title === title)

    if(requiredNote != undefined){
        console.log(chalk.inverse("your title of the note : " + title));
        console.log("your note : " + requiredNote.body);
    }
    else{
        console.log(chalk.red.inverse("Note doesn't exist!"));
    }
}


module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}

