# My Social Networks API

API REST complète pour une plateforme de réseau social, développée avec **Node.js**, **Express** et **MongoDB / Mongoose** selon une architecture **MVC** (Models, Controllers, Routes).

## Installation et lancement

1. Installer les dépendances :
   ```bash
   npm install
   ```

2. Créer un fichier `.env` à la racine du projet :
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/social_network
   ```

3. Lancer le serveur en mode développement :
   ```bash
   npm run dev
   ```

## Architecture du projet

- `controllers/` : Logique métier et gestion des requêtes/réponses HTTP
- `models/` : Schémas et validations Mongoose (12 entités)
- `routes/` : Définition des endpoints REST (`/api/...`)
- `index.js` : Point d'entrée de l'application Express et connexion MongoDB
- `postman_collection.json` : Collection Postman prête à importer

## Endpoints principaux (`baseUrl`: `http://localhost:3000/api`)

| Module | Routes principales | Description |
| :--- | :--- | :--- |
| **Utilisateurs** | `POST`, `GET`, `PUT`, `DELETE` `/users` | Gestion des comptes utilisateurs |
| **Événements** | `POST`, `GET`, `PUT`, `DELETE` `/events` | Événements publics/privés, organisateurs, participants et options |
| **Groupes** | `POST`, `GET`, `PUT`, `DELETE` `/groups` | Groupes publics, privés et secrets, administrateurs et membres |
| **Discussions** | `/threads` & `/messages` | Fils liés exclusivement à un groupe ou un événement, messages et réponses |
| **Médias** | `/albums`, `/photos` & `/comments` | Albums photos rattachés aux événements, photos et commentaires |
| **Sondages** | `/polls` & `POST /polls/:id/vote` | Sondages multi-questions à choix multiples avec vote unique par question |
| **Billetterie** | `/ticket-types` & `/tickets` | Catégories de billets payants/gratuits et achat nominatif externe avec gestion de stock |
| **Shopping List** | `/shopping-items` | Liste collaborative des articles à apporter pour un événement |
| **Covoiturage** | `/carpools` & `POST /carpools/:id/join` | Proposition de trajets et réservation de places pour un événement |

## Tests avec Postman

Importer le fichier `postman_collection.json` dans Postman pour tester l'ensemble des routes.
