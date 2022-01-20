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
    handler: function(argv){
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
    handler: function(argv){
        notes.removeNote (argv.title);
    }
})

yargs.command({
    command:'list',
    describe: 'Liste des notes',
    handler: function(){
        console.log('Je LISTE des notes');
    }
})

yargs.command({
    command:'read',
    describe: 'lit une note',
    handler: function(){
        console.log('Je LIS une note');
    }
})
// console.log(yargs.argv);
// console.log(chalk.green.bold.inverse('Success !'));
// // getNotes();

// console.log(process.argv);

yargs.parse();