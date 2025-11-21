import TestSupabase from '@/components/TestSupabase';
import { Link } from 'react-router-dom';

const Test = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            🔧 Page de Test & Diagnostic
          </h1>
          <div className="flex gap-2">
            <Link 
              to="/" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Retour à l'accueil
            </Link>
            <Link 
              to="/admin" 
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Page Admin →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📋 Informations système</h2>
          <div className="space-y-2 text-sm">
            <p><strong>URL Supabase:</strong> https://cnqdlmnrxyeltfqzrnlb.supabase.co</p>
            <p><strong>Table:</strong> login_attempts</p>
            <p><strong>Mot de passe admin:</strong> notaireFrance123</p>
          </div>
        </div>

        <TestSupabase />

        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">🚀 Guide rapide</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">Pour tester le système :</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Utilisez les boutons ci-dessus pour tester la connexion à Supabase</li>
                <li>Allez sur la <Link to="/" className="text-blue-600 underline">page d'accueil</Link> et remplissez le formulaire</li>
                <li>Vérifiez la console (F12) pour voir si les données sont enregistrées</li>
                <li>Allez sur la <Link to="/admin" className="text-blue-600 underline">page admin</Link> pour voir les tentatives de connexion</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-red-600 mb-2">Si vous ne voyez pas de données :</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Vérifiez que la table <code className="bg-gray-100 px-1 rounded">login_attempts</code> existe dans Supabase</li>
                <li>Vérifiez que les politiques RLS sont correctement configurées</li>
                <li>Vérifiez la console du navigateur pour voir les erreurs</li>
                <li>Assurez-vous que la clé API Supabase est valide</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-green-600 mb-2">Migrations SQL :</h3>
              <p className="text-sm mb-2">
                Si la table n'existe pas, exécutez la migration dans l'éditeur SQL de Supabase :
              </p>
              <code className="block bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                supabase/migrations/20250621162545-9ce17a08-4559-401e-8531-4d7fa0da8a1d.sql
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;


