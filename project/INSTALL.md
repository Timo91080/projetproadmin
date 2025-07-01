# 🎮 GameZone Manager - Guide d'Installation

## Configuration Rapide

### 1. Base de données MySQL
```sql
-- Créer la base de données et importer la structure
mysql -u root -p < backend/database/init.sql
```

### 2. Configuration Backend
Le fichier `.env` a été créé dans le dossier `backend/` avec les paramètres par défaut :
- **Base de données** : `gamezonemanager` sur localhost:3306
- **Utilisateur** : `root` (sans mot de passe)
- **Port backend** : 3001

### 3. Configuration Frontend  
Le fichier `.env` a été créé à la racine avec :
- **API URL** : http://localhost:3001/api

### 4. Démarrage des serveurs

#### Option 1 : Scripts automatiques
```bash
# Windows Batch
start-servers.bat

# PowerShell
.\start-servers.ps1
```

#### Option 2 : Manuel
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
npm run dev
```

## 🔐 Connexion par défaut
- **Email** : admin@gamezone.com
- **Mot de passe** : admin123

## 🌐 URLs
- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:3001/api

## 📁 Structure des fichiers
```
project/
├── backend/                 # API Node.js + Express
│   ├── .env                # Variables d'environnement
│   ├── database/init.sql   # Structure de la BDD
│   └── ...
├── src/                    # Frontend React + TypeScript
├── .env                    # Configuration frontend
├── start-servers.bat       # Script de démarrage (Windows)
└── start-servers.ps1       # Script de démarrage (PowerShell)
```

## 🛠 Dépannage

### Erreur de connexion à la base de données
1. Vérifiez que MySQL est démarré
2. Modifiez les paramètres dans `backend/.env`
3. Créez la base de données avec le script SQL

### Erreur de port déjà utilisé
Modifiez le port dans `backend/.env` (PORT=3001)

### Problème CORS
L'URL du frontend est configurée dans `backend/server.js`
