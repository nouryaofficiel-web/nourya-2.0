# Guide de mise en place NOURYA — Étape par étape

Ce guide est destiné à une personne qui n'a jamais utilisé Supabase ni Resend.
Suivez chaque étape dans l'ordre indiqué.

---

## Étape 1 — Créer un compte Supabase (gratuit)

1. Ouvrez votre navigateur et allez sur **https://supabase.com**
2. Cliquez sur le bouton vert **"Start your project"** en haut à droite
3. Inscrivez-vous avec votre adresse email ou via GitHub
4. Une fois connecté, cliquez sur **"New project"**
5. Remplissez les champs :
   - **Organization** : créez ou sélectionnez une organisation (votre nom par exemple)
   - **Project name** : `nourya` (ou tout nom de votre choix)
   - **Database Password** : choisissez un mot de passe fort et **notez-le**, vous en aurez besoin
   - **Region** : choisissez **Europe (Frankfurt)** pour de meilleures performances depuis l'Algérie
6. Cliquez sur **"Create new project"** — attendez 1 à 2 minutes que le projet se crée

---

## Étape 2 — Trouver votre URL et clé Supabase

1. Dans votre projet Supabase, regardez le menu de gauche
2. Cliquez sur l'icône **engrenage** (Settings) tout en bas du menu
3. Dans le sous-menu qui apparaît, cliquez sur **"API"**
4. Vous verrez deux informations importantes :
   - **Project URL** : ressemble à `https://xxxxxxxxxxxxxxxx.supabase.co`
   - **anon public** (sous "Project API keys") : une longue chaîne de caractères commençant par `eyJ...`
5. Copiez ces deux valeurs dans un endroit sûr (bloc-notes, etc.)

---

## Étape 3 — Mettre vos clés dans config.js

1. Ouvrez le fichier `/assets/js/config.js` dans votre éditeur de texte (Notepad, VS Code, etc.)
2. Remplacez les valeurs existantes :
   - `url` : collez votre **Project URL** de l'étape précédente
   - `anonKey` : collez votre clé **anon public**
3. Sauvegardez le fichier

Exemple de résultat attendu :
```js
supabase: {
  url: 'https://abcdefghijklmno.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
},
```

---

## Étape 4 — Créer les tables (migration SQL)

1. Dans votre tableau de bord Supabase, cliquez sur **"SQL Editor"** dans le menu de gauche (icône avec des lignes de code)
2. Cliquez sur **"New query"** (bouton en haut à gauche de l'éditeur)
3. Ouvrez le fichier `/supabase/migrations/001_initial_schema.sql` sur votre ordinateur
4. Sélectionnez tout le contenu du fichier (Ctrl+A) et copiez-le (Ctrl+C)
5. Collez-le dans l'éditeur SQL de Supabase (Ctrl+V)
6. Cliquez sur le bouton **"Run"** (ou appuyez sur Ctrl+Entrée)
7. Attendez quelques secondes — vous devriez voir "Success. No rows returned"
8. Vos tables (products, orders, profiles, etc.) sont maintenant créées

> **Note** : Si vous voyez une erreur "policy already exists", c'est normal si vous avez déjà exécuté le script. Ignorez ce message.

---

## Étape 5 — Créer un compte Resend pour les emails (gratuit)

Resend vous permet d'envoyer des emails de confirmation de commande automatiquement.
Le plan gratuit inclut **3 000 emails par mois**.

1. Allez sur **https://resend.com**
2. Cliquez sur **"Sign up"** en haut à droite
3. Créez votre compte avec votre adresse email
4. Une fois connecté, vous arriverez sur le tableau de bord Resend
5. Dans le menu de gauche, cliquez sur **"API Keys"**
6. Cliquez sur **"Create API Key"**
7. Donnez un nom à votre clé (par exemple : `nourya-production`)
8. Sélectionnez **"Full access"** pour les permissions
9. Cliquez sur **"Add"**
10. **IMPORTANT** : Copiez immédiatement la clé affichée (elle commence par `re_`) — elle ne sera affichée qu'une seule fois
11. Conservez-la en lieu sûr

> **Note sur le domaine email** : Pour envoyer depuis `commandes@nourya.dz`, vous devrez vérifier votre domaine dans Resend → "Domains". Si vous n'avez pas encore de domaine, vous pouvez utiliser l'adresse test Resend `onboarding@resend.dev` pour commencer.

---

## Étape 6 — Ajouter la clé Resend dans Supabase (secrets)

Ne mettez **jamais** la clé Resend dans un fichier de code. Voici comment la stocker de manière sécurisée :

1. Dans votre tableau de bord Supabase, cliquez sur **"Edge Functions"** dans le menu de gauche
2. Cliquez sur l'onglet **"Secrets"** (ou cherchez "Manage secrets")
3. Cliquez sur **"Add new secret"**
4. Remplissez les champs :
   - **Name** : `RESEND_API_KEY`
   - **Value** : collez votre clé Resend (celle qui commence par `re_`)
5. Cliquez sur **"Save secret"**

La clé est maintenant stockée de façon sécurisée et sera accessible uniquement par vos Edge Functions.

---

## Étape 7 — Déployer la fonction d'envoi d'emails

### Option A — Via le CLI Supabase (recommandé)

Si vous êtes à l'aise avec le terminal :

1. Installez le CLI Supabase : https://supabase.com/docs/guides/cli
2. Dans votre terminal, naviguez vers le dossier du projet :
   ```
   cd /chemin/vers/nourya-2.0
   ```
3. Connectez-vous à Supabase :
   ```
   supabase login
   ```
4. Liez votre projet (remplacez `VOTRE_PROJECT_ID` par l'ID visible dans l'URL de votre dashboard) :
   ```
   supabase link --project-ref VOTRE_PROJECT_ID
   ```
5. Déployez la fonction :
   ```
   supabase functions deploy send-order-email
   ```

### Option B — Via le dashboard Supabase

1. Dans votre tableau de bord Supabase, cliquez sur **"Edge Functions"**
2. Cliquez sur **"Deploy a new function"**
3. Donnez le nom `send-order-email`
4. Copiez-collez le contenu des fichiers `index.ts` et `email-template.ts` depuis le dossier `/supabase/functions/send-order-email/`
5. Cliquez sur **"Deploy Function"**

---

## Étape 8 — Créer votre compte administrateur

Pour accéder au panneau d'administration de NOURYA, vous devez créer un utilisateur et lui donner le rôle `admin`.

### Créer l'utilisateur

1. Dans Supabase, cliquez sur **"Authentication"** dans le menu de gauche
2. Cliquez sur l'onglet **"Users"**
3. Cliquez sur **"Invite user"** ou **"Add user"**
4. Entrez votre adresse email (par exemple `admin@nourya.dz`)
5. Définissez un mot de passe fort
6. Cliquez sur **"Create user"**

### Donner le rôle admin

1. Retournez dans **"SQL Editor"**
2. Créez une nouvelle requête et collez cette commande (remplacez l'email par le vôtre) :
   ```sql
   update auth.users 
   set raw_app_meta_data = jsonb_set(
     coalesce(raw_app_meta_data, '{}'),
     '{role}',
     '"admin"'
   )
   where email = 'votre@email.com';
   ```
3. Cliquez sur **"Run"**
4. Vous devriez voir "1 row affected" — votre compte a maintenant les droits admin

> **Pourquoi cette étape ?** Le panneau admin de NOURYA vérifie le rôle de l'utilisateur connecté. Sans ce rôle, vous ne pourrez pas gérer les produits, commandes, etc.

---

## Étape 9 — Configurer WhatsApp, CCP, Instagram depuis le panneau admin

Une fois votre compte admin créé et votre site en ligne :

1. Connectez-vous au panneau d'administration de NOURYA (`/admin.html`)
2. Entrez votre email et mot de passe admin
3. Cherchez la section **"Paramètres du site"** ou **"Settings"**
4. Vous pouvez y configurer :
   - **Numéro WhatsApp** : au format international `213XXXXXXXXX` (sans le +)
   - **Numéro CCP** : format `XXXXXXXXX CLÉ XX`
   - **RIB CIB** : votre numéro RIB bancaire complet
   - **BaridiMob** : votre numéro BaridiMob
   - **URL Instagram** : `https://instagram.com/nourya.dz`
   - **Email admin** : l'email qui reçoit les notifications de nouvelles commandes
5. Sauvegardez les modifications

> Ces paramètres sont stockés dans la table `site_settings` de votre base Supabase. Ils peuvent aussi être modifiés directement via le SQL Editor si nécessaire.

---

## Récapitulatif rapide

| Étape | Action | Durée estimée |
|-------|--------|---------------|
| 1 | Créer compte Supabase | 5 min |
| 2 | Récupérer URL et clé API | 2 min |
| 3 | Modifier config.js | 2 min |
| 4 | Exécuter le SQL de migration | 3 min |
| 5 | Créer compte Resend | 5 min |
| 6 | Ajouter secret RESEND_API_KEY | 2 min |
| 7 | Déployer la Edge Function | 5–10 min |
| 8 | Créer compte admin | 5 min |
| 9 | Configurer les paramètres du site | 5 min |

**Total estimé : environ 35–40 minutes**

---

## Besoin d'aide ?

- Documentation Supabase : https://supabase.com/docs
- Documentation Resend : https://resend.com/docs
- Pour toute question sur ce projet, contactez le développeur.
