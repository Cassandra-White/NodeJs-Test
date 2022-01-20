const { demandOption } = require('yargs');
const yargs = require('yargs');
const notes = require('./notes');

yargs.command({
    command:'add',
    describe: 'ajoute une note',
    builder:{
            title:{
                describe:'Titre de la note',
                demandOption: true,
                type: 'string'
            },
            body:{
                describe:'Contenu de la note',
                demandOption:true,
                type:'string',
            }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command:'remove',
    describe: 'retire une note',
    builder:{
        title:{
            describe:'Titre de la note à supprimer',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.removeNote (argv.title);
    }
})

yargs.command({
    command:'list',
    describe: 'Liste des notes',
    handler(){
        notes.listNotes();
    }
})

yargs.command({
    command:'read',
    describe: 'lit le contenu d\'une note',
    builder:{
        title:{
            describe:"Lit le contenu d'une note",
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
})
// console.log(yargs.argv);
// console.log(chalk.green.bold.inverse('Success !'));
// // getNotes();

// console.log(process.argv);

yargs.parse();