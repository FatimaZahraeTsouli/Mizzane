# Mizan — Suivi des prix des métaux précieux

## Présentation

Mizan est une application web qui permet de consulter les prix actuels des métaux précieux, notamment l'or et l'argent.
L'application permet également d'estimer la valeur d'un bijou selon son poids et le type de métal sélectionné.

## Fonctionnalités

- Affichage des prix actuels de l'or et de l'argent.
- Consultation des variations des prix.
- Affichage de l'historique des prix.
- Conversion des prix selon la devise sélectionnée.
- Estimateur de bijoux basé sur le poids et le prix actuel du métal.

## Technologies utilisées

- HTML5
- JavaScript
- Tailwind CSS
- API REST

## Installation et lancement

1. Cloner le dépôt :

   git clone https://github.com/FatimaZahraeTsouli/Mizzane

2. Accéder au dossier du projet :

   cd Mizzane

3. Installer les dépendances si nécessaire :

   npm install

4. Lancer le projet avec Live Server.

## Structure du projet

Mizan/
│
├── assets/
│   ├──images
│   ├── style.css
│   └── tailwind.css
│
├──node-modules
│
├── src/
│   ├── app.js
│   └── metalCarte.js
│
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── tailwind.config.js

## API

L'application utilise une API externe pour récupérer les prix des métaux précieux en temps réel.

Une connexion Internet est nécessaire pour actualiser les données.

## Auteur

Fatima Zahrae Tsouli

## Licence

Ce projet est réalisé dans un cadre pédagogique.