# 🚀 Guide de Déploiement sur Netlify

Ce guide vous explique comment déployer votre application React sur Netlify.

---

## 📋 Prérequis

- ✅ Compte Netlify créé
- ✅ Compte GitHub lié à Netlify
- ✅ Code poussé sur GitHub (dépôt: `notaire-redirect`)

---

## 🎯 Étape 1 : Vérifier la configuration

Les fichiers suivants ont été créés pour vous :

- ✅ `netlify.toml` - Configuration Netlify
- ✅ `public/_redirects` - Redirections pour le routing SPA

---

## 🔧 Étape 2 : Déployer depuis GitHub

### Option A : Déploiement automatique (Recommandé)

1. **Connecter le dépôt GitHub**
   - Allez sur [Netlify Dashboard](https://app.netlify.com)
   - Cliquez sur **"Add new site"** → **"Import an existing project"**
   - Sélectionnez **"GitHub"**
   - Autorisez Netlify à accéder à votre compte GitHub si nécessaire
   - Sélectionnez le dépôt : `angewarren12/notaire-redirect`

2. **Configuration du build**
   - Netlify détectera automatiquement la configuration depuis `netlify.toml`
   - Vérifiez que les paramètres suivants sont corrects :
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Cliquez sur **"Deploy site"**

3. **Attendre le déploiement**
   - Netlify va automatiquement :
     - Installer les dépendances (`npm install`)
     - Builder l'application (`npm run build`)
     - Déployer les fichiers du dossier `dist`

### Option B : Déploiement manuel (Netlify CLI)

Si vous préférez utiliser la ligne de commande :

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter à Netlify
netlify login

# Initialiser le projet
netlify init

# Builder l'application
npm run build

# Déployer
netlify deploy --prod
```

---

## ✅ Étape 3 : Vérifier le déploiement

Une fois le déploiement terminé :

1. **URL de votre site**
   - Netlify génère automatiquement une URL : `https://votre-site-123.netlify.app`
   - Vous pouvez la personnaliser dans les paramètres du site

2. **Tester les pages**
   - 🏠 Page d'accueil : `/` (formulaire de connexion)
   - 👤 Page Admin : `/admin` (tentatives de connexion)
   - 🔧 Page Test : `/test` (outils de diagnostic)

3. **Vérifier la connexion Supabase**
   - Ouvrez la console du navigateur (F12)
   - Testez le formulaire de connexion
   - Vérifiez que les données sont bien enregistrées dans Supabase

---

## 🔄 Déploiements automatiques

Une fois configuré, Netlify déploiera automatiquement :

- ✅ **À chaque push sur la branche `main`** → Déploiement en production
- ✅ **À chaque pull request** → Déploiement de prévisualisation

---

## 🌐 Configuration d'un domaine personnalisé (Optionnel)

1. Allez dans **Site settings** → **Domain management**
2. Cliquez sur **"Add custom domain"**
3. Suivez les instructions pour configurer votre DNS

---

## 🔐 Variables d'environnement (Si nécessaire)

Si vous devez utiliser des variables d'environnement :

1. Allez dans **Site settings** → **Environment variables**
2. Ajoutez vos variables :
   - `VITE_SUPABASE_URL` (si vous voulez la rendre configurable)
   - `VITE_SUPABASE_ANON_KEY` (si vous voulez la rendre configurable)

**Note :** Actuellement, les clés Supabase sont directement dans le code. C'est acceptable pour les clés publiques (anon key).

---

## 📊 Monitoring et Logs

- **Build logs** : Disponibles dans l'onglet "Deploys"
- **Function logs** : Si vous utilisez des fonctions Netlify
- **Analytics** : Disponible dans les plans payants

---

## 🐛 Dépannage

### Erreur : "Build failed"

1. Vérifiez les logs de build dans Netlify
2. Testez le build en local : `npm run build`
3. Vérifiez que toutes les dépendances sont dans `package.json`

### Erreur : "Page not found" sur les routes

- Vérifiez que le fichier `public/_redirects` existe
- Vérifiez que `netlify.toml` contient la configuration de redirects

### Erreur : "Supabase connection failed"

- Vérifiez que l'URL Supabase est correcte dans `src/integrations/supabase/client.ts`
- Vérifiez que la clé API est valide
- Vérifiez que la table `login_attempts` existe dans Supabase

---

## 📝 Checklist de déploiement

Avant de déployer :

- [ ] Code poussé sur GitHub
- [ ] `netlify.toml` créé
- [ ] `public/_redirects` créé
- [ ] Build fonctionne en local (`npm run build`)
- [ ] Table Supabase créée
- [ ] Configuration Supabase à jour

Après le déploiement :

- [ ] Site accessible sur l'URL Netlify
- [ ] Page d'accueil fonctionne (`/`)
- [ ] Page admin fonctionne (`/admin`)
- [ ] Formulaire enregistre dans Supabase
- [ ] Pas d'erreurs dans la console (F12)

---

## 🎉 C'est tout !

Votre application est maintenant déployée sur Netlify ! 🚀

**Avantages de Netlify :**
- ✅ Déploiement automatique depuis GitHub
- ✅ HTTPS automatique
- ✅ CDN global
- ✅ Redéploiement automatique à chaque push
- ✅ Prévisualisations pour les pull requests

---

*Guide créé pour le projet Notaire - Version 1.0*

