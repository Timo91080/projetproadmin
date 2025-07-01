# 📚 Guide détaillé des fichiers - GameZone Manager

## 🔍 Explication complète de chaque fichier de code

---

## 📁 **BACKEND (Node.js + Express)**

### 🚀 **server.js** - Point d'entrée principal
```javascript
// Ce fichier configure et démarre le serveur Express
```

**Rôle** : 
- 🌐 Initialise le serveur Express
- 🔧 Configure les middlewares (CORS, sécurité, parsing JSON)
- 🗄️ Établit la connexion à la base de données MySQL
- 🛣️ Définit les routes API (/api/auth, /api/clients, etc.)
- 🔒 Applique la sécurité (helmet, rate limiting)
- ⚡ Démarre le serveur sur le port configuré

**Middlewares utilisés** :
- `helmet()` - Sécurité des headers HTTP
- `cors()` - Gestion des requêtes cross-origin
- `express.json()` - Parsing des données JSON
- `express-rate-limit` - Limitation du taux de requêtes

---

### 🔧 **config/database.js** - Configuration base de données
```javascript
// Gestion de la connexion MySQL avec pool de connexions
```

**Rôle** :
- 🔗 Crée et maintient la connexion MySQL
- ⚙️ Utilise les variables d'environnement (.env)
- 🏊 Pool de connexions pour optimiser les performances
- ❌ Gestion des erreurs de connexion
- 🔄 Reconnexion automatique en cas de perte

**Configuration** :
- Host, port, utilisateur, mot de passe depuis `.env`
- Pool de 10 connexions simultanées max
- Timeout de connexion configuré

---

### 🛡️ **middleware/auth.js** - Authentification JWT
```javascript
// Middleware pour vérifier les tokens JWT
```

**Rôle** :
- 🔑 Vérifie la validité des tokens JWT
- 👤 Extrait les informations de l'admin depuis le token
- 🚫 Bloque l'accès aux routes protégées
- ⏰ Vérifie l'expiration des tokens

**Fonctionnement** :
1. Extrait le token du header `Authorization`
2. Vérifie avec la clé secrète JWT
3. Décode les informations admin
4. Passe au middleware suivant ou renvoie une erreur

---

### 🛠️ **middleware/errorHandler.js** - Gestion d'erreurs
```javascript
// Middleware global pour capturer et formater les erreurs
```

**Rôle** :
- 🚨 Capture toutes les erreurs non gérées
- 📝 Log les erreurs pour le débogage
- 📤 Renvoie des réponses d'erreur standardisées
- 🔒 Masque les détails sensibles en production

---

### 🛣️ **routes/auth.js** - Authentification
```javascript
// Routes pour la connexion et la gestion des admins
```

**Endpoints** :
- `POST /api/auth/login` - Connexion admin

**Fonctionnalités** :
- ✅ Validation des données (email, mot de passe)
- 🔐 Vérification du mot de passe avec bcrypt
- 🎟️ Génération de token JWT
- 📊 Retour des informations admin (sans mot de passe)

**Sécurité** :
- Hachage bcrypt pour les mots de passe
- Rate limiting sur les tentatives de connexion
- Validation stricte des entrées

---

### 👥 **routes/clients.js** - Gestion des clients
```javascript
// CRUD complet pour les clients
```

**Endpoints** :
- `GET /api/clients` - Liste tous les clients avec statistiques
- `POST /api/clients` - Crée un nouveau client
- `GET /api/clients/:id` - Récupère un client spécifique
- `PUT /api/clients/:id` - Met à jour un client
- `DELETE /api/clients/:id` - Supprime un client

**Fonctionnalités** :
- 📊 Calcul automatique du nombre de réservations par client
- ✅ Validation des données (email unique, formats)
- 🔗 Jointures SQL pour les statistiques
- 🗑️ Suppression en cascade des réservations liées

---

### 🖥️ **routes/stations.js** - Gestion des stations
```javascript
// Gestion des stations PC et consoles
```

**Endpoints** :
- `GET /api/stations` - Liste toutes les stations
- `POST /api/stations` - Crée une nouvelle station
- `GET /api/stations/:id` - Détails d'une station
- `PUT /api/stations/:id` - Met à jour une station
- `DELETE /api/stations/:id` - Supprime une station

**Logique métier** :
- 🖥️ Différenciation PC/Console avec tables spécialisées
- 📋 Pour PC : stockage config dans table `bureau`
- 🎮 Pour Console : stockage nombre manettes dans `espaceconsole`
- 📊 Calcul des statistiques d'utilisation

---

### 📅 **routes/reservations.js** - Gestion des réservations
```javascript
// Système de réservation complexe avec multi-clients
```

**Endpoints** :
- `GET /api/reservations` - Liste avec filtres et pagination
- `POST /api/reservations` - Crée réservation multi-clients
- `GET /api/reservations/:id` - Détails complets
- `PUT /api/reservations/:id` - Modification
- `DELETE /api/reservations/:id` - Annulation

**Fonctionnalités avancées** :
- 👥 Support multi-clients par réservation
- 📅 Vérification des conflits de créneaux
- 🔗 Gestion de la table de liaison `client_reservation`
- 📊 Statistiques et rapports

---

### ⏱️ **routes/sessions.js** - Sessions de jeu
```javascript
// Suivi en temps réel des sessions actives
```

**Endpoints** :
- `GET /api/sessions` - Sessions actives et historique
- `POST /api/sessions/start` - Démarre une session
- `PUT /api/sessions/:id/end` - Termine une session
- `GET /api/sessions/active` - Sessions en cours

**Logique métier** :
- ⏰ Calcul automatique de la durée
- 📊 Mise à jour des statistiques temps réel
- 🔄 Synchronisation avec les réservations
- 📈 Métriques de performance

---

### 📊 **routes/dashboard.js** - Statistiques
```javascript
// Agrégation de données pour le tableau de bord
```

**Endpoints** :
- `GET /api/dashboard/stats` - Statistiques générales

**Métriques calculées** :
- 👥 Nombre total de clients
- 🖥️ Nombre de stations disponibles
- 📅 Réservations du jour
- ⏱️ Sessions actives
- 📊 Tendances et évolutions

---

## 📁 **FRONTEND (React + TypeScript)**

### 🚀 **main.tsx** - Point d'entrée
```tsx
// Bootstrap de l'application React
```

**Rôle** :
- 🎯 Point d'entrée principal de l'app
- 🏗️ Initialise React avec createRoot
- 📦 Importe les styles globaux (index.css)
- 🔧 Configure le mode strict pour le développement

---

### 📱 **App.tsx** - Composant racine
```tsx
// Structure principale avec routing
```

**Fonctionnalités** :
- 🛣️ Configuration React Router avec routes protégées
- 🔐 Intégration du contexte d'authentification
- 🏗️ Layout principal avec sidebar et header
- 📍 Gestion des redirections (/ vers /dashboard)

**Structure des routes** :
- `/login` - Page de connexion (publique)
- `/dashboard` - Tableau de bord (protégé)
- `/clients` - Gestion clients (protégé)
- `/stations` - Gestion stations (protégé)
- `/reservations` - Gestion réservations (protégé)
- `/sessions` - Sessions actives (protégé)

---

### 🔒 **contexts/AuthContext.tsx** - Gestion de l'authentification
```tsx
// Context React pour l'état d'authentification global
```

**Fonctionnalités** :
- 👤 Stockage de l'état admin connecté
- 🎟️ Gestion des tokens JWT dans localStorage
- 🔄 Rechargement automatique de l'état à l'initialisation
- 📤 Fonctions de connexion/déconnexion
- 🔐 Vérification automatique de l'expiration des tokens

**État géré** :
- `admin` : Informations de l'admin connecté (ou null)
- `loading` : État de chargement initial
- Fonctions `login()` et `logout()`

---

### 🛡️ **components/ProtectedRoute.tsx** - Routes protégées
```tsx
// Composant HOC pour protéger les routes
```

**Rôle** :
- 🔐 Vérifie l'authentification avant l'accès
- 🔄 Redirige vers /login si non connecté
- ⏳ Affiche un loader pendant la vérification
- 🎯 Wraps les composants nécessitant une authentification

---

### 🏗️ **components/Layout.tsx** - Layout principal
```tsx
// Structure de mise en page avec sidebar + contenu
```

**Structure** :
- 📋 Sidebar fixe à gauche
- 📊 Zone de contenu principale à droite
- 📱 Design responsive avec Tailwind CSS
- 🎨 Couleurs et espacement cohérents

---

### 📋 **components/Sidebar.tsx** - Navigation latérale
```tsx
// Menu de navigation principal
```

**Fonctionnalités** :
- 🧭 Navigation entre les différentes sections
- 🎯 Indicateur de page active
- 🎨 Icônes Lucide React
- 📱 Design responsive
- 🔐 Bouton de déconnexion

**Sections** :
- 🏠 Dashboard
- 👥 Clients  
- 🖥️ Stations
- 📅 Réservations
- ⏱️ Sessions

---

### 📊 **components/Header.tsx** - En-tête
```tsx
// Barre supérieure avec informations admin
```

**Contenu** :
- 👤 Nom de l'admin connecté
- 🏷️ Titre de la page courante
- 🎨 Style cohérent avec le design système

---

### 🏠 **pages/Dashboard.tsx** - Tableau de bord
```tsx
// Vue d'ensemble avec statistiques et métriques
```

**Fonctionnalités** :
- 📊 Cartes de statistiques (clients, stations, réservations)
- 📈 Indicateurs temps réel
- 🔄 Rafraîchissement automatique des données
- 🎨 Design avec grille responsive
- ⚡ Chargement asynchrone des données

**Métriques affichées** :
- Nombre total de clients
- Stations disponibles
- Réservations du jour
- Sessions actives

---

### 👥 **pages/Clients.tsx** - Gestion des clients
```tsx
// CRUD complet pour les clients
```

**Fonctionnalités** :
- 📋 Liste paginée des clients
- ➕ Formulaire d'ajout de nouveau client
- ✏️ Modification en ligne
- 🗑️ Suppression avec confirmation
- 🔍 Recherche et filtrage
- 📊 Statistiques par client (nombre de réservations)

**État géré** :
- Liste des clients
- Modal d'édition
- État de chargement
- Gestion des erreurs

---

### 🖥️ **pages/Stations.tsx** - Gestion des stations
```tsx
// Interface pour gérer PC et consoles
```

**Fonctionnalités** :
- 📋 Vue d'ensemble des stations par type
- 🖥️ Configuration spécifique PC (config matérielle)
- 🎮 Configuration console (nombre de manettes)
- ➕ Ajout de nouvelles stations
- 📊 Statistiques d'utilisation
- 🔧 Modification des configurations

---

### 📅 **pages/Reservations.tsx** - Gestion des réservations
```tsx
// Interface complexe pour les réservations
```

**Fonctionnalités** :
- 📋 Vue calendaire/liste des réservations
- ➕ Creation de réservations multi-clients
- 🔄 Modification des créneaux
- ❌ Annulation avec gestion des sessions
- 🔍 Filtres par date, station, client
- 📊 Vue détaillée avec historique

**Complexité** :
- Gestion des conflits de réservation
- Interface multi-sélection clients
- Validation des créneaux
- Synchronisation temps réel

---

### ⏱️ **pages/Sessions.tsx** - Sessions actives
```tsx
// Monitoring temps réel des sessions
```

**Fonctionnalités** :
- 📋 Liste des sessions en cours
- ⏰ Chronomètres temps réel
- 🏁 Arrêt manuel des sessions
- 📊 Historique des sessions terminées
- 📈 Métriques de durée moyenne
- 🔄 Actualisation automatique

---

### 🔐 **pages/Login.tsx** - Page de connexion
```tsx
// Interface d'authentification
```

**Fonctionnalités** :
- 📝 Formulaire de connexion (email/mot de passe)
- ✅ Validation côté client
- 🔒 Gestion des erreurs d'authentification
- 🔄 Redirection après connexion
- 🎨 Design centré et responsive

**Validation** :
- Format email
- Champs obligatoires
- Messages d'erreur contextuel

---

### 🌐 **services/apiService.ts** - Client HTTP principal
```typescript
// Service centralisé pour les appels API
```

**Fonctionnalités** :
- 🔗 Instance Axios configurée
- 🎟️ Injection automatique des tokens JWT
- 🔄 Intercepteurs pour les erreurs
- 📝 Types TypeScript pour les réponses
- 🏗️ Méthodes pour chaque entité (clients, stations, etc.)

**Configuration** :
- Base URL depuis variables d'environnement
- Headers par défaut
- Timeout configuré
- Gestion des erreurs HTTP

---

### 🔐 **services/authService.ts** - Service d'authentification
```typescript
// Service spécialisé pour l'authentification
```

**Fonctionnalités** :
- 🔑 Méthodes de connexion/déconnexion
- 💾 Gestion du stockage local des tokens
- ⏰ Vérification de l'expiration
- 🔄 Rafraîchissement automatique
- 📤 Décodage des informations JWT

---

## 🔧 **Fichiers de configuration**

### 📦 **package.json** - Dépendances et scripts
- **Frontend** : React, TypeScript, Vite, Tailwind, Router
- **Backend** : Express, MySQL2, JWT, bcrypt, validation

### ⚡ **vite.config.ts** - Configuration Vite
- Plugin React
- Optimisations de build
- Configuration du serveur de développement

### 🎨 **tailwind.config.js** - Configuration Tailwind CSS
- Thème personnalisé
- Classes utilitaires
- Responsivité

### 📝 **tsconfig.json** - Configuration TypeScript
- Options de compilation
- Chemins d'importation
- Types stricts

---

## 🔄 **Flow de données typique**

1. **🔐 Authentification** : Login → JWT token → stockage localStorage
2. **📡 Requête API** : Component → Service → API → Database
3. **🔄 État** : Response → setState → Re-render → UI update
4. **🛡️ Sécurité** : Token dans headers → Middleware auth → Route protégée

---

## 🏗️ **Architecture des composants React**

```
App.tsx (Router + AuthProvider)
├── Layout.tsx (Structure principale)
│   ├── Sidebar.tsx (Navigation)
│   ├── Header.tsx (En-tête)
│   └── Pages/ (Contenu principal)
├── ProtectedRoute.tsx (Sécurité)
└── AuthContext.tsx (État global)
```

Cette architecture assure une séparation claire des responsabilités et une maintenabilité optimale du code.
