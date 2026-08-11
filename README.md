# 1. Nom du projet

**Nom du projet :** Gestion Commerciale — Frontend React (Clients, Produits, Commandes)

---

# 2. Présentation du projet

Ce projet est une application web (frontend React) qui permet de gérer les clients, les produits et les commandes d'une entreprise à travers une interface sécurisée connectée à une API REST paginée.

Il s'adresse principalement aux équipes internes de l'entreprise : administrateurs, managers et utilisateurs opérationnels chargés du suivi commercial.

Son objectif principal est de fournir un tableau de bord clair et des outils de gestion (recherche, filtrage, tri, pagination) adaptés au rôle de chaque utilisateur, tout en sécurisant l'accès aux données via une authentification JWT.

---

# 3. Problématique

Le problème identifié est que les équipes n'ont pas d'interface unifiée et sécurisée pour consulter et gérer les clients, les produits et les commandes, avec des droits d'accès différents selon les rôles (administrateur, manager, utilisateur).

La solution proposée permet de se connecter via un compte sécurisé, d'accéder à un tableau de bord adapté au rôle, puis de consulter, créer, modifier et supprimer les clients, produits et commandes selon les autorisations accordées, avec des fonctionnalités de recherche, de filtrage, de tri et de pagination.

---

# 4. Fonctionnalités principales

- S'authentifier (inscription, connexion, déconnexion) via JWT
- Protéger automatiquement les routes privées et restreindre l'accès selon le rôle de l'utilisateur
- Consulter un tableau de bord affichant les indicateurs clés (clients, produits, commandes, stock faible, etc.)
- Gérer les clients (créer, consulter, modifier, supprimer)
- Gérer les produits (créer, consulter, modifier, supprimer, filtrer par catégorie ou prix)
- Gérer les commandes (créer, consulter, modifier le statut, filtrer par client ou par statut)
- Rechercher, trier et paginer les listes de données
- Gérer automatiquement les erreurs d'API (401, 403, 404, 500) via des intercepteurs Axios

---

# 5. Technologies utilisées

| Technologie | Utilisation dans le projet |
|-------------|----------------------------|
| React 19 | Développement de l'interface utilisateur en composants |
| Vite | Outil de build et serveur de développement |
| React Router DOM | Gestion de la navigation et des routes protégées |
| Axios | Communication avec l'API REST (intercepteurs pour le JWT et la gestion des erreurs) |
| React Hook Form | Gestion des formulaires (connexion, inscription, clients, produits, commandes) |
| Yup | Validation des données des formulaires |
| MUI | Composants d'interface (tableaux, cartes, boutons, dialogues) |
| Docker | Conteneurisation de l'application frontend |
| Git / GitHub | Versionnement et gestion du code source |

> Nous avons utilisé **React 19 avec Vite** pour construire une interface rapide et modulaire, **Axios** pour centraliser les appels API et la gestion des erreurs, **React Hook Form et Yup** pour fiabiliser la saisie des formulaires, et **MUI** pour homogénéiser le design de l'application.

---

# 6. Installation et lancement

## 6.1 Prérequis

Pour utiliser ce projet, vous devez disposer de :

- Node.js (version 18 ou supérieure)
- npm
- Git
- Une API backend fonctionnelle (fournissant les endpoints d'authentification, clients, produits, commandes)
- Un éditeur de code (VS Code recommandé)

## 6.2 Cloner le dépôt

```bash
git clone LIEN_DU_DEPOT
```

Commande de votre projet :

```bash
git clone <URL_DU_DEPOT_A_COMPLETER>
```

## 6.3 Ouvrir le dossier

```bash
cd NOM_DU_PROJET
```

Commande de votre projet :

```bash
cd <NOM_DU_DOSSIER_A_COMPLETER>
```

## 6.4 Installer les dépendances

```bash
npm install
```

## 6.5 Variables d'environnement

Créer le fichier `.env` à la racine du projet :

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Gestion Commerciale
```

### Point de vigilance

- Tester toutes les commandes
- Vérifier les chemins
- Ne jamais publier :
    - mots de passe
    - clés API
    - tokens
    - identifiants

## 6.6 Lancer le projet

```bash
npm run dev
```

## 6.7 Ouvrir le projet

Après le lancement, l'application est accessible à l'adresse :

```
http://localhost:5173
```

## 6.8 Lancer avec Docker (optionnel)

```bash
docker build -t frontend-gestion-commerciale .
docker run -p 5173:5173 frontend-gestion-commerciale
```

---

# 7. Captures d'écran

## Capture 1

### Titre

```
Page de connexion
```

### Image

```md
![Page de connexion](chemin-vers-image.png)
```

### Explication

Cette capture montre le formulaire de connexion permettant à l'utilisateur de s'authentifier avec son adresse e-mail et son mot de passe avant d'accéder au tableau de bord.

## Capture 2

### Titre

```
Tableau de bord
```

### Image

```md
![Tableau de bord](chemin-vers-image.png)
```

### Explication

Cette capture montre le tableau de bord principal avec les indicateurs clés (nombre de clients, de produits, de commandes en attente, expédiées et livrées) adaptés au rôle de l'utilisateur connecté.

## Capture 3

### Titre

```
Gestion des produits
```

### Image

```md
![Gestion des produits](chemin-vers-image.png)
```

### Explication

Cette capture montre la liste des produits avec les options de recherche par catégorie, de filtrage par prix, de tri et de pagination.

> Remplacez les chemins d'image ci-dessus par les captures réelles de votre application avant de publier le README.

---

# 8. Contribution personnelle

Ma contribution principale a porté sur le développement complet du frontend React de l'application.

J'ai également travaillé sur la mise en place de l'authentification JWT, des intercepteurs Axios, des gardes de routes (protection par authentification et par rôle) ainsi que sur les modules de gestion des clients, des produits et des commandes.

J'ai été responsable de l'intégration de la pagination, du tri, de la recherche et du filtrage des données consommées depuis l'API.

> À personnaliser : adaptez ce texte si le projet a été réalisé en groupe, en précisant précisément vos tâches par rapport à celles des autres membres.

---

# 9. Difficultés rencontrées

## Difficulté 1

### Texte final

J'ai rencontré le problème suivant : la gestion de l'expiration du token JWT provoquait des erreurs 401 non gérées, laissant l'utilisateur bloqué sur une page nécessitant une authentification valide.

Pour comprendre l'origine du problème, j'ai analysé les réponses de l'API et testé différents scénarios d'expiration de session.

J'ai résolu le problème en mettant en place un intercepteur de réponse Axios qui détecte les erreurs 401, déconnecte automatiquement l'utilisateur et le redirige vers la page de connexion.

Cette difficulté m'a permis d'apprendre à centraliser la gestion des erreurs HTTP et à sécuriser le cycle de vie de l'authentification côté frontend.

## Difficulté 2

### Texte final

J'ai rencontré le problème suivant : certains utilisateurs non autorisés pouvaient accéder brièvement à des pages réservées à un rôle spécifique (par exemple la gestion des utilisateurs réservée à ADMIN).

Pour comprendre l'origine du problème, j'ai revu la logique de contrôle d'accès et testé le comportement des routes avec différents rôles.

J'ai résolu le problème en créant un composant `RoleGuard` qui vérifie le rôle de l'utilisateur avant d'afficher le contenu de la route et redirige vers une page "Accès refusé" en cas de rôle non autorisé.

Cette difficulté m'a permis d'apprendre à structurer un contrôle d'accès robuste basé sur les rôles au sein d'une application React.

---

# 10. Améliorations possibles

Dans une prochaine version, je pourrais :

- ajouter des tests automatisés (unitaires et end-to-end) ;
- améliorer la sécurité (rafraîchissement automatique du token, stockage plus sûr) ;
- rendre l'interface pleinement responsive sur mobile ;
- ajouter des notifications en temps réel pour le suivi des commandes.

### Conclusion

Ces améliorations permettraient de renforcer la fiabilité, la sécurité et l'expérience utilisateur de l'application, tout en facilitant sa maintenance et son évolution future.