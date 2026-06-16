# 🗂️ KanbanRT — Application web de gestion de tâches

> Application Kanban full-stack permettant de gérer des tâches par colonnes de statut, avec authentification, base de données en temps réel et déploiement continu.

---

## 👥 Membres du binôme

| Membre | GitHub |
|--------|--------|
| Paul Gauthier | [@paul-gauthier42](https://github.com/Paul-Gauthier42) |
| Gauthier Play-Meraud | [@gunther364](https://github.com/Gunther364) |

---

## 🚀 Application déployée

🔗 **[https://r2-09-six.vercel.app/login]**

---

## 🛠️ Stack technique

| Technologie | Rôle |
|-------------|------|
| **React + Vite** | Framework front-end / bundler |
| **React Router DOM** | Navigation SPA (Single Page Application) |
| **Supabase** | Base de données PostgreSQL + Authentification JWT + Storage |
| **Vercel** | Hébergement + Déploiement continu CI/CD + Fonctions serverless |
| **Tailwind CSS** | Stylisation responsive |
| **Resend** | Envoi d'e-mails transactionnels via API Route |

---

## 📁 Structure du projet

```bash
mon-kanban/
├── api/
│   └── send-email.js       # Fonction serverless Vercel (envoi e-mail)
├── src/
│   ├── lib/
│   │   └── supabase.js     # Client Supabase initialisé
│   ├── pages/
│   │   ├── LoginPage.jsx   # Page connexion / inscription
│   │   ├── DashboardPage.jsx # Dashboard principal avec colonnes Kanban
│   │   └── ProfilePage.jsx  # Page profil utilisateur
│   ├── components/
│   │   ├── Navbar.jsx       # Barre de navigation responsive
│   │   ├── TaskCard.jsx     # Carte de tâche avec badges
│   │   ├── TaskForm.jsx     # Formulaire de création de tâche
│   │   ├── TaskList.jsx     # Liste des tâches par colonne
│   │   └── UserTable.jsx    # Tableau de gestion des utilisateurs
│   ├── App.jsx              # Routeur principal + gestion de session
│   └── main.jsx
├── .env.local               # Variables d'environnement (NON commité)
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation locale

### Prérequis

- [Node.js](https://nodejs.org) v20+ et npm
- [Git](https://git-scm.com)
- Un compte [Supabase](https://supabase.com) avec un projet configuré

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/Paul-Gauthier42/R2.09.git
cd mon-kanban

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Puis éditer .env.local avec vos clés Supabase (voir ci-dessous)

# 4. Lancer le serveur de développement
npm run dev
# → Application disponible sur http://localhost:5173

# (Optionnel) Pour tester les API Routes Vercel en local (envoi d'e-mail)
npx vercel dev
```

### Variables d'environnement (`.env.local`)

Créez un fichier `.env.local` à la racine du projet avec vos propres clés :

```env
VITE_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> ⚠️ **Ne jamais commiter ce fichier.** Il est exclu par `.gitignore`.  
> Les clés se trouvent dans votre projet Supabase → Settings → API.

---

## ✅ Fonctionnalités implémentées

- 🔐 **Authentification** — Inscription, connexion et déconnexion via Supabase Auth (JWT)
- 🛡️ **Route protégée** — Redirection automatique vers `/login` si non authentifié
- 📋 **Dashboard Kanban** — 4 colonnes : À faire / En cours / Validation / Terminée
- ➕ **Création de tâche** — Formulaire complet (titre, statut, priorité, catégorie, date d'échéance)
- 🗑️ **Suppression de tâche** — Avec confirmation, suppression effective en base de données
- 🏷️ **Badges colorés** — Priorité (Haute/Moyenne/Basse), Statut, Catégorie
- 👤 **Page profil** — Modification du nom, changement de mot de passe, upload d'avatar
- 📧 **Notifications e-mail** — Envoi automatique lors de la création d'une tâche avec échéance
- 💬 **[Fonctionnalité libre]** — *[Décrire ici votre US-10, ex : Système de commentaires sur les tâches]*

---

## 🗄️ Modèle de base de données (Supabase)

| Table | Description |
|-------|-------------|
| `auth.users` | Gérée par Supabase Auth (email, mot de passe, JWT) |
| `profiles` | Métadonnées utilisateur (nom, rôle) |
| `boards` | Tableaux Kanban associés à un propriétaire |
| `categories` | Catégories réutilisables (Réseau, Dev, Doc, Sécurité…) |
| `tasks` | Tâches avec statut, priorité, catégorie, date d'échéance |

---

---

## 🔒 Sécurité

- Le fichier `.env.local` est **exclu de Git** via `.gitignore`
- La clé `service_role` Supabase n'est **jamais exposée** côté client
- La clé `RESEND_API_KEY` est exécutée **uniquement côté serveur** (fonction serverless Vercel)
- Le **Row Level Security (RLS)** est activé sur Supabase avec des politiques par utilisateur

---

## 📦 Déploiement

Le projet utilise un pipeline CI/CD automatique :

1. `git push origin main` → déclenche un build Vercel automatiquement
2. Vercel exécute `vite build` et déploie les fichiers statiques sur son CDN mondial
3. Les fonctions dans `/api` sont déployées comme fonctions serverless
4. Les variables d'environnement sont configurées dans Vercel → Settings → Environment Variables

---

## 📄 Rapport

Le rapport PDF complet du projet est disponible dans ce dépôt : `Gauthier-Play-Meraud-KanbanRTrapport.pdf`

---
