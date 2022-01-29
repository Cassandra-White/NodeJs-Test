# Task Manager API

Task Manager API est une api qui permet de créer/lire/modifier/supprimer des listes de tâches.
Elle inclu une incription/connection par addresse mail + mot de passe et un suivi des connections grâce à des tokens.

Chaque connection sur un nouvelle appareil créer un nouveau token, ce qui permet la validité de ces tokens de façon différente celon les habitudes d'utilisation de chaque personnes.

Selon les actions de l'utilisateur, des mails automatique l'informeront des Créations, Modification ou Suppressions sur son compte.

##  Sommaire :

### Comment installer l'API :
- [Démo](#démo)

- [Dépendences](#dépendences)

- [Clone](#clone)

- [Installer](#installer)

- [Déployer](#déployer)

### Comment Utiliser l'API :

- [Utilisation](#utilisation)

    - [Requête Utilisateurs](#utilisateurs) 
    
        Les requêtes :
        - [Requete Création d'un compte](#créationinscription-dun-compte-)
        - [Requete Connection](#loginconnection-à-un-compte-existant-)
        - [Requete Déconnection](#logoutdéconnection-dun-compteappareil-connecté-)
        - [Requete Déconnection de tous les appareils](#logoutdéconnection-de-tout-les-comptesappareils-connecté-)
        - [Requete Afficher compte](#récupérations-des-données-de-lutilisateur-connecté-)
        - [Requete Modifier compte](#patchmodification-des-données-de-lutilisateur-connecté-)
        - [Requete Supprimer compte](#suppression-du-compte-utilisateur-connecté-)
        - [Requete Ajouter un Avatar au compte](#ajouter-un-avatar-au-compte-utilisateur-connecté-)
        - [Requete  Supprimer l'Avatar du compte](#supprimer-lavatar-du-compte-utilisateur-connecté-)
        - [Requete Afficher l'Avatar d'un compte](#afficher-lavatar-dun-compte-utilisateur-)
      
    
    - [Requête Tâches](#tâches) 
    
        Les requêtes :
        - [Requete Création d'un compte](#créationinscription-dun-compte-)
        - [Requete Création d'un compte](#créationinscription-dun-compte-)
        - [Requete Création d'un compte](#créationinscription-dun-compte-)
        - [Requete Création d'un compte](#créationinscription-dun-compte-)
        - [Requete Création d'un compte](#créationinscription-dun-compte-)
        - [Requete Création d'un compte](#créationinscription-dun-compte-)
    

- [Screen](#screen)


## Démo

###  API Démo

Démo: [Link](https://task-manager-git.herokuapp.com)


 ## VS Code 
 
 Vous pouvez voir et tester le code sur [Visual Studio Code Online](https://github.dev/Cassandra-White/NodeJs-Test)

## Dépendences

    
| Tools                      | Versions |
| -------------------------  | -------- |
| npm                        | 8.3.0    |
| nodejs                     | 16.6.2   |
| express                    | 4.17.2   |
| @sendgrid/mail             | 7.6.0    |
| bcrypt                     | 5.0.1    |
| jsonwebtoken               | 8.5.1    |
| mongodb                    | 4.3.1    |
| mongoose                   | 6.1.8    |
| multer                     | 1.4.4    |
| sharp                      | 0.29.3   |
| validator                  | 13.7.0   |



## Clone

```
git clone git@github.com:Cassandra-White/NodeJs-Test.git
```

## Installer

```
cd task-manager/
npm install
```


## Déployer

Depuis la racine du repo : 
  - Créer configurer une base de données sur [MongoDB](https://www.mongodb.com/)
  - Créer et configurer un compte API sur [Sendgrid](https://sendgrid.com/)
  - Créer un fichier .env
  - Ajouter quatres variables d'environnement dans le fichier .env
  
  ```
  exemple :
  
      PORT=3000
      SINDGRID_KEY_API=votreCléApiSendgrid
      AUTH_TOKEN=choisissezUnePhrasePourlaCréationDeVosToken
      MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api(version local)
   ```   
      

```
npm run start
```

## Utilisation

Lien de l'api : 

                https://task-manager-git.herokuapp.com

je recommande l'utilisation de [Postman](https://www.postman.com/) pour l'envoie et le test des requêtes.



 ### Utilisateurs
 
 Vous trouverez ici les requêtes possible, les données attendu et les données renvoyé par l'api
 Cette section est divisé en deux partie :
 
 Uitlisateurs : Représente tout ce qui est en relation avec le compte de 'lutilisateur
 Tâches : Représente tout ce qui est en relation avec les tâches créer par l'utilisateur.
 
 
 #### Création/Inscription d'un compte :
 ```
 type : POST 
 url  : /users 
 JSON : {
    "name": "userExemple",
    "email": "mailexemple@domaineExemple.com",
    "password": "passwordExemple",
    "age": uintNumberExemple
}
action serveur : envoi d'un mail de d'information d'inscription.

données renvoyé : {
    "user": {
        "name": string,
        "age": booleen,
        "email": string,
        "_id": ObjectID,
        "createdAt": Date,
        "updatedAt": Date,
    },
    "token": string
}
 ```
 ---
 
  #### Login/Connection à un compte existant :
  ```
 type : POST 
 url  : /users/login
 JSON : {
    "email": "mailexemple@domaineExemple.com",
    "password": "passwordExemple"
}
action serveur : aucune
données renvoyé : {
    "user": {
        "name": string,
        "age": booleen,
        "email": string,
        "_id": ObjectID,
        "createdAt": Date,
        "updatedAt": Date,
    },
    "token": string
}

 ```
 ---
 
   #### Logout/Déconnection d'un compte/appareil connecté :
  ```
 type : POST 
 url  : /users/logout
 JSON : {
   *nothing*
}
action serveur  : aucune
données renvoyé : {
    "message": string,
}
 ```
 
 ---
 
   #### Logout/Déconnection de tout les comptes/appareils connecté :
  ```
 type : POST 
 url  : /users/logoutall
 JSON : {
   *nothing*
}
action serveur  : aucune
données renvoyé : {
    "message": string,
}
 ```
 ---
 
   #### Récupérations des données de l'utilisateur connecté :
  ```
 type : GET 
 url  : /users/me
 JSON : {
   *nothing*
}
action serveur : aucune
données renvoyé : {
    "_id": string,
    "name": string,
    "age": booleen,
    "email": string,
    "createdAt": Date,
    "updatedAt": Date,
}

 ```
 ---
 
   #### Patch/Modification des données de l'utilisateur connecté :
  ```
 type : PATCH 
 url  : /users/me
 JSON : {
    "name": "userExemple",
    "email": "mailexemple@domaineExemple.com",
    "password": "passwordExemple",
    "age": uint (default : 0)
}
action serveur : SI changment de Mot de passe - envoi d'un mail de confirmation d'information.
données renvoyé : {
    "_id": string,
    "name": string,
    "age": booleen,
    "email": string,
    "createdAt": Date,
    "updatedAt": Date,
}

 ```  
 ---
 
   #### Suppression du compte utilisateur connecté :
  ```
 type : DELETE 
 url  : /users/me
 JSON : {
 *nothing*
}
action serveur : Envoi d'un mail de confirmation de suppression.
données renvoyé : {
    "message": string,
} 

 ```
  ---
 
   #### Ajouter un avatar au compte utilisateur connecté :
  ```
 type : POST 
 url  : /users/me/avatar
 Form-data : {
    file: Image - JPG / JPEG / PNG
}
action serveur : aucune.
données renvoyé : {
    "message": string,
}

 ```
 
   ---
 
   #### Supprimer l'avatar du compte utilisateur connecté :
  ```
 type : DELETE 
 url  : /users/me/avatar
 JSON : {
 *nothing*
}
action serveur : aucune.
données renvoyé : {
    "message": string,
}
 ```
 
---
 
   #### Afficher l'avatar d'un compte utilisateur :
  ```
 type : GET 
 url  : /users/:id/avatar
 JSON : {
 *nothing*
}
action serveur : aucune.
données renvoyé : {
    image.png
}

 ```
---
---
---
 
 
 ### Tâches
 
 
  #### Création d'une tâche :
 ```
 type : POST 
 url  : /tasks 
 JSON : {
    "description": "Mettez ce que vous voulez ici",
    "completed": booleen (default : false),

}
action serveur : aucune.
données renvoyé : {
    "description": string,
    "completed": booleen,
    "owner": ObjectID,
    "_id": ObjectID,
    "createdAt": Date,
    "updatedAt": Date,
    "__v": 0
}

 ```
 ---
 
   #### Afficher/filtrer les tâches d'un utilisateur connecté:
 ```
 type : GET 
 url  : /tasks ||
 url-Alternatif: /tasks?completed=true (filtre par complété ou non complété) ||
 url-alternatif: /tasks?limit=2&skip=2 (filtre par page exemple: 2 par page - page n°2) ||
 url-alternatif: /tasks?limit=2&skip=2&completed=true (filtre par page exemple: 2 par page - page n°2 seulement les complété)
 JSON : {
    *nothing*
}
action serveur : aucune.
données renvoyé : {
    "description": string,
    "completed": booleen,
    "owner": ObjectID,
    "_id": ObjectID,
    "createdAt": Date,
    "updatedAt": Date,
    "__v": 0
}
 ```
 ---
 
   #### Afficher une tâches d'un utilisateur  connecté:
 ```
 type : GET 
 url  : /tasks/:id ||
 JSON : {
    *nothing*
}
action serveur : aucune.
données renvoyé : {
    "description": string,
    "completed": booleen,
    "owner": ObjectID,
    "_id": ObjectID,
    "createdAt": Date,
    "updatedAt": Date,
    "__v": 0
}
 ```
 ---
 
   #### Modifier une tâches d'un utilisateur connecté:
 ```
 type : PATCH 
 url  : /tasks/:id
 JSON : {
    description: "Modifier une description",
    completed: booleen (modifier le status d'une tâche)
}
action serveur : aucune.
données renvoyé : {
    "description": string,
    "completed": booleen,
    "owner": ObjectID,
    "_id": ObjectID,
    "createdAt": Date,
    "updatedAt": Date,
    "__v": 0
}
 ```
 ---
 
   #### Supprimer une tâches d'un utilisateur connecté:
 ```
 type : DELETE 
 url  : /tasks/:id
 JSON : {
    *nothing*
}
action serveur : aucune.
données renvoyé : {
    "message": string
}

 ```
 ---
 
 

## Screen
