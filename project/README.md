# GameZone Manager

Système de gestion pour salle de jeux vidéo avec interface d'administration complète.

## 🎮 Fonctionnalités

### Frontend (React + TypeScript)
- **Authentification** : Connexion sécurisée des administrateurs
- **Tableau de bord** : Statistiques en temps réel et aperçu des activités
- **Gestion des clients** : CRUD complet avec informations de contact
- **Gestion des stations** : Support PC et consoles avec configurations
- **Réservations** : Création et gestion des réservations multi-clients
- **Sessions de jeu** : Suivi des sessions actives avec durée

### Backend (Node.js + Express)
- **API RESTful** : Endpoints sécurisés pour toutes les opérations
- **Base de données MySQL** : Structure optimisée avec relations
- **Authentification JWT** : Tokens sécurisés avec expiration
- **Validation** : Contrôle des données avec express-validator
- **Sécurité** : CORS, Helmet, Rate limiting

## 🚀 Installation

### Prérequis
- Node.js (v18+)
- MySQL (v8+)
- npm ou yarn

### Configuration Backend

1. Naviguez vers le dossier backend :
```bash
cd backend
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez la base de données :
   - Créez une base de données MySQL nommée `gamezonemanager`
   - Importez le fichier `gamezonemanager.sql` fourni

4. Configurez les variables d'environnement :
```bash
cp .env.example .env
```

5. Modifiez le fichier `.env` avec vos paramètres :
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=gamezonemanager
DB_PORT=3306

JWT_SECRET=votre-clé-secrète-très-sécurisée
JWT_EXPIRES_IN=7d

PORT=3001
NODE_ENV=development

ADMIN_EMAIL=admin@gamezone.com
ADMIN_PASSWORD=admin123
```

6. Démarrez le serveur backend :
```bash
npm run dev
```

### Configuration Frontend

1. Revenez au dossier racine et installez les dépendances :
```bash
npm install
```

2. Démarrez le serveur de développement :
```bash
npm run dev
```

## 📊 Structure de la Base de Données

### Tables principales :
- **admin** : Comptes administrateurs
- **client** : Informations des clients
- **stationjeu** : Stations de jeu (PC/Console)
- **bureau** : Configuration spécifique PC
- **espaceconsole** : Configuration spécifique console
- **reservation** : Réservations des clients
- **client_reservation** : Liaison clients-réservations
- **sessiondejeu** : Sessions de jeu actives/terminées

## 🔐 Authentification

### Compte administrateur par défaut :
- **Email** : admin@gamezone.com
- **Mot de passe** : admin123

## 🎨 Interface Utilisateur

### Design moderne avec :
- Palette de couleurs gaming (violet/cyan/orange)
- Navigation intuitive avec sidebar
- Tableaux interactifs avec actions CRUD
- Modals pour les formulaires
- Animations et feedback visuel
- Design responsive

### Pages principales :
- **Dashboard** : Vue d'ensemble avec statistiques
- **Clients** : Gestion complète des clients
- **Stations** : Configuration des postes de jeu
- **Réservations** : Planning et gestion des réservations
- **Sessions** : Suivi des sessions en cours et historique

## 🛡️ Sécurité

- Authentification JWT avec expiration
- Validation des données côté serveur
- Protection CORS configurée
- Rate limiting pour éviter les abus
- Hashage des mots de passe avec bcrypt
- Middleware de sécurité Helmet

## 📱 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion admin
- `GET /api/auth/verify` - Vérification token

### Clients
- `GET /api/clients` - Liste des clients
- `POST /api/clients` - Créer un client
- `PUT /api/clients/:id` - Modifier un client
- `DELETE /api/clients/:id` - Supprimer un client

### Stations
- `GET /api/stations` - Liste des stations
- `POST /api/stations` - Créer une station
- `PUT /api/stations/:id` - Modifier une station
- `DELETE /api/stations/:id` - Supprimer une station

### Réservations
- `GET /api/reservations` - Liste des réservations
- `POST /api/reservations` - Créer une réservation
- `DELETE /api/reservations/:id` - Supprimer une réservation

### Sessions
- `GET /api/sessions` - Liste des sessions
- `POST /api/sessions/start` - Démarrer une session
- `PUT /api/sessions/:id/end` - Terminer une session
- `DELETE /api/sessions/:id` - Supprimer une session

### Dashboard
- `GET /api/dashboard/stats` - Statistiques générales

## 🔧 Développement

### Scripts disponibles :

**Frontend :**
- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Aperçu du build

**Backend :**
- `npm run dev` - Serveur avec nodemon
- `npm start` - Serveur de production

## 📦 Technologies Utilisées

### Frontend :
- React 18 + TypeScript
- Vite (build tool)
- React Router (navigation)
- Tailwind CSS (styling)
- Lucide React (icônes)
- Axios (requêtes HTTP)
- React Hook Form + Zod (formulaires)

### Backend :
- Node.js + Express
- MySQL2 (base de données)
- JWT (authentification)
- Bcrypt (hashage)
- Express Validator (validation)
- Helmet (sécurité)
- CORS (cross-origin)

## 🚀 Déploiement

### Production :
1. Configurez les variables d'environnement de production
2. Buildez le frontend : `npm run build`
3. Déployez le backend sur votre serveur
4. Configurez un reverse proxy (nginx) pour servir le frontend
5. Assurez-vous que MySQL est accessible

### Recommandations :
- Utilisez HTTPS en production
- Configurez des sauvegardes automatiques de la base de données
- Surveillez les logs d'erreur
- Mettez en place un monitoring des performances

## 📄 Licence

Ce projet est développé pour la gestion d'une salle de jeux vidéo. Tous droits réservés.