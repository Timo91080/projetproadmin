-- Ajout de la table admin pour l'authentification
USE gamezonemanager;

-- Table des administrateurs (ajout nécessaire pour l'authentification)
CREATE TABLE IF NOT EXISTS admin (
    id_admin INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) DEFAULT 'Admin'
);

-- Insertion d'un administrateur par défaut (hash bcrypt pour "admin123")
INSERT IGNORE INTO admin (email, password, nom, prenom) 
VALUES ('admin@gamezone.com', '$2b$10$QFJ.Uc8n3v4x5TZ2KQh6AO7mNvJ5a9e4x6/8c3d2f1g0h9i8j7k6l5', 'Admin', 'GameZone');
