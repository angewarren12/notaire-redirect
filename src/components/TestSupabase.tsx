import { useState } from 'react';
import { testSupabaseConnection, countLoginAttempts, showRecentAttempts } from '@/utils/testSupabase';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

/**
 * Composant de test pour vérifier la connexion à Supabase
 * À utiliser uniquement en développement pour déboguer
 */
const TestSupabase = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState<number | null>(null);

  const runTests = async () => {
    setIsLoading(true);
    setTestResult('Tests en cours...');
    
    console.clear();
    const result = await testSupabaseConnection();
    
    if (result) {
      setTestResult('✅ Tous les tests sont passés avec succès! Vérifiez la console (F12) pour plus de détails.');
    } else {
      setTestResult('❌ Les tests ont échoué. Vérifiez la console (F12) pour voir les erreurs.');
    }
    
    setIsLoading(false);
  };

  const getCount = async () => {
    setIsLoading(true);
    const count = await countLoginAttempts();
    setAttemptCount(count);
    setTestResult(count !== null 
      ? `📊 Nombre total de tentatives: ${count}` 
      : '❌ Impossible de compter les tentatives'
    );
    setIsLoading(false);
  };

  const showRecent = async () => {
    setIsLoading(true);
    await showRecentAttempts(10);
    setTestResult('📊 Les 10 dernières tentatives sont affichées dans la console (F12)');
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>🔧 Outil de Test Supabase</CardTitle>
        <CardDescription>
          Utilisez cet outil pour vérifier la connexion à la base de données
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={runTests} 
            disabled={isLoading}
            variant="default"
          >
            {isLoading ? '⏳ En cours...' : '🧪 Lancer les tests'}
          </Button>
          
          <Button 
            onClick={getCount} 
            disabled={isLoading}
            variant="secondary"
          >
            📊 Compter les tentatives
          </Button>
          
          <Button 
            onClick={showRecent} 
            disabled={isLoading}
            variant="outline"
          >
            👀 Voir les dernières tentatives
          </Button>
        </div>

        {attemptCount !== null && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-lg font-semibold text-blue-900">
              Total: {attemptCount} tentative(s) de connexion
            </p>
          </div>
        )}

        {testResult && (
          <div className={`p-4 rounded-md border ${
            testResult.includes('✅') 
              ? 'bg-green-50 border-green-200 text-green-900' 
              : testResult.includes('❌')
              ? 'bg-red-50 border-red-200 text-red-900'
              : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}>
            <p className="whitespace-pre-wrap">{testResult}</p>
          </div>
        )}

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-sm">
          <p className="font-semibold mb-2">💡 Instructions :</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Ouvrez la console du navigateur (F12)</li>
            <li>Cliquez sur "🧪 Lancer les tests" pour vérifier la connexion</li>
            <li>Les résultats détaillés s'afficheront dans la console</li>
            <li>Si les tests échouent, vérifiez votre configuration Supabase</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestSupabase;


