# Titre du Projet Backend

Bienvenue dans le projet Backend! Ce projet est construit avec Laravel et utilise Laravel Sanctum pour l'authentification API.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les logiciels suivants :
- [PHP](https://www.php.net/) (version 7.4 ou supérieure)
- [Composer](https://getcomposer.org/)
- [MySQL](https://www.mysql.com/) ou tout autre système de gestion de base de données que Laravel supporte
- Serveur Web comme [Nginx](https://nginx.org/) ou [Apache](https://httpd.apache.org/)

## Installation

Suivez ces étapes pour configurer le projet localement.

### Cloner le Répertoire

Pour commencer, clonez ce dépôt sur votre machine locale :

```bash
git clone https://example.com/mon-projet-backend.git
cd mon-projet-backend
```

### Installer les Dépendances

Exécutez Composer pour installer les dépendances nécessaires :

```bash
composer install
```

### Configurer l’Environnement

Copiez le fichier .env.example en .env et modifiez les paramètres de base de données et autres configurations selon votre environnement :
    
    ```bash
    cp .env.example .env
    ```
Ouvrez le fichier .env et modifiez les valeurs suivantes :

	•	DB_DATABASE - votre base de données
	•	DB_USERNAME - votre nom d’utilisateur
	•	DB_PASSWORD - votre mot de passe

### Générer la Clé d’Application

Exécutez la commande suivante pour générer une clé d'application :

```bash
php artisan key:generate
```

### Exécuter les Migrations et les Seeders

Créez les tables de base de données et peuplez-les avec des données de test :
    
    ```bash
    php artisan migrate --seed
    ```

### Configurer Swagger

Générez la documentation API avec Swagger :
    
    ```bash
    php artisan l5-swagger:generate
    ```
Démarrage du Serveur

Démarrez le serveur de développement intégré :
    
    ```bash
    php artisan serve
    ```
Votre serveur backend est maintenant accessible via http://localhost:8000.

Utilisation de l’API

### Vous pouvez accéder à la 

documentation de l’API générée par Swagger en naviguant vers :

http://localhost:8000/api/documentation

Explorez les différents endpoints disponibles et testez-les directement depuis l’interface Swagger UI.

