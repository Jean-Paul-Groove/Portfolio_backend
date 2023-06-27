# Portfolio - Backend

## Description:

Backend du Portfolio, API Node et Express gérant le contenu du Portfolio ainsi que l'envoi d'e-mail. Base de donnée MySQL.

## Fonctionnalités

Gestion de la connexion administrateur pour : - Modifier l'introduction. - Opérations C.R.U.D. sur la galerie de projets. - Modifier le CV en téléchargeable par le visiteur.

Envoi automatisé d'e-mail depuis les informations du formulaire de contact.

## Comment lancer le projet ?

### Avec npm

Utilisez la commande `npm install` pour installer les dépendances.

Créer un fichier .env (cf partie suivante).

Utilisez la commande `npm  run dev` pour lancer le projet en mode développement avec Nodemon.

Insérer un **username**, et un **password** dans la TABLE **admin**. Le **password** doit être un hash bcrypt(Salt de 10 rounds).

## Variables d'environnement nécessaires

Pour que le projet fonctionne, vous devez renseigner certaines variables d'environnements relatives aux comptes e-mail utilisés ou aux identifiants MySQL par exemple.

Se référer au fichier .env.template pour le modèle des variables à définir.

## Librairies utilisées

### Requêtes SQL avec mysql2

Utilisation de **mysql2** pour les requête auprès de la base de donnée.

### Envoi d'e-mail avec nodemailer

Envoi des messages laissés par les utilisateur sur le portfolio avec **nodemailer**.

### Logger: winston

Création de logs avec **winston**

### Gestion des uploads avec multer

Recetpion et vérification des fichiers transmis en form-data depuis le front-end avec **multer**.

### Optimisation des images avec sharp

Mise à l'échelle 500\*500 et conversion au format webp avec **sharp**

### Gestion de l'authentification

Encryptage du mot de passe admin avec **bcrypt**.

Gestion de la connexion via **jsonwebtoken**.

### Dépendence de développement

Configuration des variables d'environnement avec **dotenv**.

Rechargement du serveur automatiquement après chaque modification avec **nodemon**.

Utilisation de **Typescript** pour le typage et **ts-node** pour l'exécuter sur node.

Utilisation de **tsconfig-paths** pour faciliter le débuggage.
