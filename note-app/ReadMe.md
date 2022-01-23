## Note App Terminal

note-app-terminale est un programme qui sert à ecrire des notes dans un fichier depuis le terminale

##  Lien Rapide

[Dépendences](#dépendences)

[Clone](#clone)

[Installer](#installer)

[Utilisation](#utilisation)


## Dépendences

    
| Tools                      | Versions |
| -------------------------  | -------- |
| npm                        | 8.3.0    |
| nodejs                     | 16.6.2   |
| chalk                      | 2.4.1    |
| validator                  | 13.7.0   |
| yargs                      | 12.0.2   |


## Clone

```
git clone git@github.com:Cassandra-White/NodeJs-Test.git
```

## Installer

```
cd note-app/
npm install
```

## Utilisation

- Ajouter une note :
```
node app.js add --title="Ajouter un titre" --body="ajouter un body"
```

- Retirer une note :
```
node app.js remove --title="Ajouter un titre"
```

- Lister toutes les notes :
```
node app.js list
```

- Lire une note :
```
node app.js read --title="Ajouter un titre"
```

- Afficher l'aide :
```
node app.js --help [commande]

```

## Screen

| ![ajouter](https://github.com/Cassandra-White/NodeJs-Test/blob/main/note-app/add.png?raw=true) | ![lister](https://github.com/Cassandra-White/NodeJs-Test/blob/main/note-app/list.png?raw=true) |
| ------------ | ------------- |
| ![lire](https://github.com/Cassandra-White/NodeJs-Test/blob/main/note-app/read.png?raw=true) | ![supprimer](https://github.com/Cassandra-White/NodeJs-Test/blob/main/note-app/delete.png?raw=true) |
| ![help](https://github.com/Cassandra-White/NodeJs-Test/blob/main/note-app/help.png?raw=true) | 
 
