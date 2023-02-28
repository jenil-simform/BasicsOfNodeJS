const yargs = require("yargs");
const notes = require('./notes');

//creating add command
yargs.command({
    command : "add",
    describe : "Add a new note",
    builder : {
        title : {
            describe : "Note Title",
            demandOption : true,
            type : 'string'
        },
        body : {
            describe : "Note Body",
            demandOption : true,
            type : 'string'
        }
        
    },
    handler(argv){
        notes.addNotes(argv.title, argv.body)
    }


})

//creating remove command
yargs.command({
    command : "remove",
    describe : "Remove a note",
    builder : {
        title : {
            describe : "Note Title",
            demandOption : true,
            type : 'string'
        },
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//creating list command
yargs.command({
    command : "list",
    describe : "List notes",
    handler(){
        notes.listNotes();
    }
})

//creating read command
yargs.command({
    command : "read",
    describe : "Read note",
    builder : {
        title : {
            describe : "Note Title",
            demandOption : true,
            type : 'string'
        },
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.parse();