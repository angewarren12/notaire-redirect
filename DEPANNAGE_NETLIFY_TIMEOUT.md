# 🔧 Dépannage : ERR_TIMED_OUT sur Netlify

## 🚨 Problème

Erreur : `ERR_TIMED_OUT` - Le site Netlify ne répond pas.

## 🔍 Causes possibles

1. **Build échoué** - Le build sur Netlify a échoué
2. **Site en pause** - Le site a été mis en pause
3. **Déploiement incomplet** - Le déploiement n'a pas été terminé
4. **Problème de configuration** - Configuration incorrecte dans Netlify

---

## ✅ Solutions étape par étape

### 1. Vérifier le statut du site dans Netlify Dashboard

1. Allez sur [Netlify Dashboard](https://app.netlify.com)
2. Cliquez sur votre site `notaire-redirect`
3. Vérifiez l'onglet **"Deploys"**
4. Regardez le dernier déploiement :
   - ✅ **"Published"** = Le site est en ligne
   - ⚠️ **"Building"** = Le build est en cours (attendez)
   - ❌ **"Failed"** = Le build a échoué (voir les logs)
   - ⏸️ **"Paused"** = Le site est en pause

### 2. Vérifier les logs de build

1. Dans Netlify Dashboard → **Deploys**
2. Cliquez sur le dernier déploiement
3. Regardez les **"Build logs"**
4. Cherchez les erreurs :
   - ❌ `npm ERR!` → Problème avec les dépendances
   - ❌ `Build failed` → Erreur de compilation
   - ❌ `Command failed` → Commande de build échouée

### 3. Vérifier la configuration du site

Dans Netlify Dashboard → **Site settings** → **Build & deploy** :

**Build settings :**
- **Build command** : `npm run build` ✅
- **Publish directory** : `dist` ✅
- **Node version** : Vérifiez qu'une version est sélectionnée (ex: 18.x ou 20.x)

### 4. Vérifier si le site est en pause

1. Netlify Dashboard → **Site settings** → **General**
2. Vérifiez la section **"Site status"**
3. Si le site est **"Paused"**, cliquez sur **"Resume site"**

### 5. Redéployer manuellement

1. Netlify Dashboard → **Deploys**
2. Cliquez sur **"Trigger deploy"** → **"Deploy site"**
3. Attendez 2-3 minutes que le build se termine

### 6. Vérifier les fichiers de configuration

Assurez-vous que ces fichiers sont présents dans votre dépôt GitHub :

- ✅ `netlify.toml` - Configuration Netlify
- ✅ `package.json` - Scripts de build
- ✅ `public/_redirects` - Redirections pour le routing

---

## 🔄 Solution rapide : Redéployer depuis GitHub

### Option 1 : Push un nouveau commit

```bash
# Faire un petit changement (ajouter un espace dans un fichier)
git add .
git commit -m "Trigger Netlify rebuild"
git push origin main
```

Netlify détectera automatiquement le changement et redéploiera.

### Option 2 : Redéployer depuis Netlify

1. Netlify Dashboard → **Deploys**
2. Cliquez sur **"Trigger deploy"**
3. Sélectionnez **"Deploy site"**
4. Choisissez la branche `main`
5. Cliquez sur **"Deploy"**

---

## 🐛 Erreurs courantes et solutions

### Erreur : "Build command failed"

**Solution :**
1. Vérifiez que `npm run build` fonctionne en local
2. Vérifiez les logs de build dans Netlify
3. Assurez-vous que toutes les dépendances sont dans `package.json`

### Erreur : "Publish directory not found"

**Solution :**
1. Vérifiez que le dossier `dist` est créé après le build
2. Vérifiez la configuration dans `netlify.toml` :
   ```toml
   publish = "dist"
   ```

### Erreur : "Node version not specified"

**Solution :**
1. Netlify Dashboard → **Site settings** → **Build & deploy**
2. Dans **"Environment"**, ajoutez :
   - **Variable** : `NODE_VERSION`
   - **Value** : `18` ou `20`

Ou créez un fichier `.nvmrc` à la racine :
```
18
```

### Erreur : "Timeout during build"

**Solution :**
1. Le build prend trop de temps (> 15 minutes)
2. Optimisez le build (réduire les dépendances)
3. Vérifiez qu'il n'y a pas de boucles infinies dans le code

---

## 📋 Checklist de vérification

Avant de contacter le support :

- [ ] Le build fonctionne en local (`npm run build`)
- [ ] Les fichiers sont poussés sur GitHub
- [ ] Le site n'est pas en pause dans Netlify
- [ ] Les logs de build ne montrent pas d'erreur
- [ ] La configuration `netlify.toml` est correcte
- [ ] Le dossier `dist` est créé après le build
- [ ] Le fichier `_redirects` est dans `dist/`

---

## 🆘 Si rien ne fonctionne

1. **Vérifier le statut Netlify** : https://www.netlifystatus.com/
2. **Contacter le support Netlify** : https://www.netlify.com/support/
3. **Créer un nouveau site** :
   - Supprimez l'ancien site
   - Créez un nouveau site et connectez-le à GitHub
   - Redéployez

---

## 🎯 Commandes utiles

```bash
# Tester le build en local
npm run build

# Vérifier que dist/_redirects existe
ls dist/_redirects

# Vérifier le contenu de dist
ls dist/

# Tester en local
npm run preview
```

---

*Guide de dépannage - Si le problème persiste, vérifiez les logs de build dans Netlify Dashboard*

