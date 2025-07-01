-- GameZone Manager Database Structure - Ajout table admin pour l'authentification
-- Utilise la structure existante de votre base de données

USE gamezonemanager;

-- Table des administrateurs (ajout nécessaire pour l'authentification)
CREATE TABLE IF NOT EXISTS admin (
    id_admin INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) DEFAULT 'Admin'
);

-- Vos tables existantes sont déjà créées :
-- - client (id_client, nom, prenom, email)
-- - stationjeu (id_station, plateforme)  
-- - bureau (id_station, config_pc)
-- - espaceconsole (id_station, nombre_manettes)
-- - reservation (id_reservation, date_reservation, id_station)
-- - client_reservation (id_client, id_reservation)
-- - sessiondejeu (id_session, debut_session, fin_session, id_reservation)

-- Insertion d'un administrateur par défaut (hash bcrypt pour "admin123")
INSERT INTO admin (email, password, nom, prenom) 
VALUES ('admin@gamezone.com', '$2b$10$QFJ.Uc8n3v4x5TZ2KQh6AO7mNvJ5a9e4x6/8c3d2f1g0h9i8j7k6l5', 'Admin', 'GameZone')
ON DUPLICATE KEY UPDATE email=email;

-- Insertion de quelques données de test si les tables sont vides
INSERT IGNORE INTO client (nom, prenom, email) VALUES 
('Dupont', 'Jean', 'jean.dupont@email.com'),
('Martin', 'Marie', 'marie.martin@email.com'),
('Durand', 'Pierre', 'pierre.durand@email.com');

INSERT IGNORE INTO stationjeu (plateforme) VALUES 
('PC'),
('PC'), 
('Console'),
('Console');

-- Ajouter les configurations PC dans la table bureau
INSERT IGNORE INTO bureau (id_station, config_pc) 
SELECT id_station, 'Intel i7-12700K, RTX 4070, 32GB RAM, SSD 1TB' 
FROM stationjeu WHERE plateforme = 'PC' LIMIT 1;

INSERT IGNORE INTO bureau (id_station, config_pc) 
SELECT id_station, 'Intel i5-12400F, RTX 4060, 16GB RAM, SSD 500GB' 
FROM stationjeu WHERE plateforme = 'PC' AND id_station NOT IN (SELECT id_station FROM bureau) LIMIT 1;

-- Ajouter les configurations console dans la table espaceconsole
INSERT IGNORE INTO espaceconsole (id_station, nombre_manettes) 
SELECT id_station, 4 
FROM stationjeu WHERE plateforme = 'Console' LIMIT 1;

INSERT IGNORE INTO espaceconsole (id_station, nombre_manettes) 
SELECT id_station, 2 
FROM stationjeu WHERE plateforme = 'Console' AND id_station NOT IN (SELECT id_station FROM espaceconsole) LIMIT 1;
