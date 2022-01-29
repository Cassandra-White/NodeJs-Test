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
        - [Requete Connection](#loginconnection-dun-compte-)
        - [Requete Déconnection](#logoutdéconnection-dun-compteappareil-)
        - [Requete Déconnection de tous les appareils](#logoutdéconnection-de-tout-les-comptesappareils-)
        - [Requete Afficher compte](#récupérations-des-données-de-lutilisateur-connecté-)
        - [Requete Modifier compte](#patchmodification-des-données-de-lutilisateur-connecté-)
        - [Requete Supprimer compte](#suppression-du-compte-lutilisateur-connecté-)
        - [Requete Création d'un compte](#créationinscription-dun-compte-)
        - [Requete Création d'un compte](#créationinscription-dun-compte-)
        - [Requete Création d'un compte](#créationinscription-dun-compte-)
      
    
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

je recommande l'utilisation de [Postman](https://www.postman.com/) pour l'envoie et le test des requêtes.

 ### Utilisateurs
 
 
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
 ```
 ---
 
   #### Logout/Déconnection d'un compte/appareil connecté :
  ```
 type : POST 
 url  : /users/logout
 JSON : {
   *nothing*
}
action serveur : aucune
 ```
 ---
 
   #### Logout/Déconnection de tout les comptes/appareils connecté :
  ```
 type : POST 
 url  : /users/logoutall
 JSON : {
   *nothing*
}
action serveur : aucune
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
    "age": uintNumberExemple
}
action serveur : SI changment de Mot de passe - envoi d'un mail de confirmation d'information.
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
 ```
 
 
 
 ### Tâches

## Screen
