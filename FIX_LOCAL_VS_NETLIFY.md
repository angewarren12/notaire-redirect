# 🔧 Fix : Fonctionne en local mais pas sur Netlify

## 🎯 Problème

L'application fonctionne parfaitement en local mais ne fonctionne pas sur Netlify.

## ✅ Corrections appliquées

### 1. Configuration Vite mise à jour

Ajout de `base: '/'` dans `vite.config.ts` pour s'assurer que les chemins sont corrects sur Netlify :

```typescript
export default defineConfig(({ mode }) => ({
  base: '/', // Important pour Netlify
  // ...
}));
```

### 2. Configuration du build optimisée

Ajout de la configuration de build dans `vite.config.ts` pour garantir un build correct.

---

## 🔍 Vérifications à faire

### 1. Vérifier les logs de build Netlify

1. Allez sur [Netlify Dashboard](https://app.netlify.com)
2. Ouvrez votre site `notaire-redirect`
3. Onglet **"Deploys"** → Cliquez sur le dernier déploiement
4. Regardez les **"Build logs"**

**Cherchez ces erreurs :**
- ❌ `npm ERR!` → Problème avec les dépendances
- ❌ `Cannot find module` → Module manquant
- ❌ `Build failed` → Erreur de compilation
- ❌ `Command failed` → Commande échouée

### 2. Vérifier que le build fonctionne

**En local :**
```bash
npm run build
```

**Vérifiez que :**
- ✅ Le dossier `dist/` est créé
- ✅ Le fichier `dist/_redirects` existe
- ✅ Le fichier `dist/index.html` existe
- ✅ Le dossier `dist/assets/` contient les fichiers JS et CSS

### 3. Vérifier la console du navigateur

Sur Netlify, ouvrez la console (F12) et cherchez :
- ❌ Erreurs 404 (fichiers non trouvés)
- ❌ Erreurs CORS
- ❌ Erreurs de chargement de modules
- ❌ Erreurs Supabase

### 4. Vérifier la configuration Netlify

Dans Netlify Dashboard → **Site settings** → **Build & deploy** :

**Build settings :**
- ✅ **Build command** : `npm run build`
- ✅ **Publish directory** : `dist`
- ✅ **Node version** : 18 ou 20 (vérifié avec `.nvmrc`)

**Environment variables :**
- Aucune variable d'environnement nécessaire pour l'instant (Supabase est en dur dans le code)

---

## 🐛 Problèmes courants et solutions

### Problème 1 : "Cannot find module" dans les logs

**Solution :**
```bash
# Vérifier que toutes les dépendances sont dans package.json
npm install

# Rebuild
npm run build
```

### Problème 2 : Assets non chargés (404 sur /assets/...)

**Solution :**
- Vérifier que `base: '/'` est dans `vite.config.ts` ✅ (déjà fait)
- Vérifier que les chemins dans `dist/index.html` commencent par `/assets/`

### Problème 3 : Routes ne fonctionnent pas

**Solution :**
- Vérifier que `dist/_redirects` existe avec le contenu : `/*    /index.html   200`
- Vérifier la configuration dans `netlify.toml`

### Problème 4 : Supabase ne fonctionne pas

**Solution :**
- Vérifier que l'URL Supabase est correcte dans `src/integrations/supabase/client.ts`
- Vérifier que la clé API est valide
- Vérifier la console du navigateur pour les erreurs CORS

### Problème 5 : Timeout lors du build

**Solution :**
- Vérifier que le build ne prend pas plus de 15 minutes
- Optimiser les dépendances si nécessaire
- Vérifier qu'il n'y a pas de boucles infinies

---

## 📋 Checklist de diagnostic

### Avant de redéployer :

- [ ] Le build fonctionne en local (`npm run build`)
- [ ] Le dossier `dist/` contient tous les fichiers nécessaires
- [ ] Le fichier `dist/_redirects` existe
- [ ] Le fichier `dist/index.html` existe
- [ ] Les assets sont dans `dist/assets/`
- [ ] La configuration `vite.config.ts` contient `base: '/'`
- [ ] Le fichier `netlify.toml` est présent
- [ ] Le fichier `.nvmrc` est présent

### Après le redéploiement :

- [ ] Les logs de build Netlify ne montrent pas d'erreur
- [ ] Le site est accessible (pas de timeout)
- [ ] La route `/` fonctionne
- [ ] La route `/admin` fonctionne
- [ ] La console du navigateur ne montre pas d'erreur
- [ ] Supabase fonctionne (testez le formulaire)

---

## 🚀 Solution rapide : Redéployer

### Option 1 : Push un nouveau commit

```bash
git add .
git commit -m "Fix: Configuration Vite pour Netlify + base path"
git push origin main
```

### Option 2 : Redéployer depuis Netlify

1. Netlify Dashboard → **Deploys**
2. Cliquez sur **"Trigger deploy"** → **"Deploy site"**
3. Sélectionnez la branche `main`
4. Cliquez sur **"Deploy"**

---

## 🔍 Commandes de diagnostic

```bash
# Tester le build en local
npm run build

# Vérifier le contenu de dist
ls dist/

# Vérifier que _redirects existe
cat dist/_redirects

# Tester en local avec preview
npm run preview
```

---

## 📝 Fichiers modifiés

- ✅ `vite.config.ts` - Ajout de `base: '/'` et configuration de build
- ✅ `src/pages/Test.tsx` - URL Supabase mise à jour

---

## 🎯 Prochaines étapes

1. **Commiter et pousser les changements**
2. **Vérifier les logs de build Netlify**
3. **Tester le site après déploiement**
4. **Vérifier la console du navigateur** pour les erreurs

---

*Si le problème persiste, vérifiez les logs de build Netlify pour identifier l'erreur exacte.*

