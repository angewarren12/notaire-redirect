// Outil de test pour vérifier la connexion à Supabase
import { supabase } from '@/integrations/supabase/client';

/**
 * Teste la connexion à Supabase et la table login_attempts
 */
export async function testSupabaseConnection() {
  console.log('🔍 Test de connexion à Supabase...');
  console.log('URL:', supabase.supabaseUrl);
  
  try {
    // Test 1: Vérifier que la table existe
    console.log('\n📋 Test 1: Lecture de la table login_attempts...');
    const { data: selectData, error: selectError } = await supabase
      .from('login_attempts')
      .select('*')
      .limit(5);
    
    if (selectError) {
      console.error('❌ Erreur lors de la lecture:', selectError);
      return false;
    }
    
    console.log('✅ Lecture réussie!');
    console.log(`📊 Nombre d'enregistrements trouvés: ${selectData?.length || 0}`);
    if (selectData && selectData.length > 0) {
      console.log('📄 Premier enregistrement:', selectData[0]);
    }
    
    // Test 2: Tester l'insertion
    console.log('\n📝 Test 2: Insertion d\'un test...');
    const testEmail = `test-${Date.now()}@example.com`;
    const { data: insertData, error: insertError } = await supabase
      .from('login_attempts')
      .insert({
        email: testEmail,
        password_attempt: 'test-password',
        ip_address: 'Test',
        user_agent: 'Test Agent'
      })
      .select();
    
    if (insertError) {
      console.error('❌ Erreur lors de l\'insertion:', insertError);
      return false;
    }
    
    console.log('✅ Insertion réussie!');
    console.log('📄 Données insérées:', insertData);
    
    // Test 3: Vérifier que l'insertion est visible
    console.log('\n🔄 Test 3: Vérification de l\'insertion...');
    const { data: verifyData, error: verifyError } = await supabase
      .from('login_attempts')
      .select('*')
      .eq('email', testEmail)
      .single();
    
    if (verifyError) {
      console.error('❌ Erreur lors de la vérification:', verifyError);
      return false;
    }
    
    console.log('✅ Vérification réussie!');
    console.log('📄 Données retrouvées:', verifyData);
    
    console.log('\n✅ Tous les tests sont passés avec succès!');
    console.log('🎉 La connexion à Supabase fonctionne correctement.');
    return true;
    
  } catch (error) {
    console.error('❌ Erreur générale:', error);
    return false;
  }
}

/**
 * Compte le nombre total de tentatives de connexion
 */
export async function countLoginAttempts() {
  try {
    const { data, error, count } = await supabase
      .from('login_attempts')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Erreur lors du comptage:', error);
      return null;
    }
    
    return count;
  } catch (error) {
    console.error('Erreur:', error);
    return null;
  }
}

/**
 * Affiche les dernières tentatives de connexion
 */
export async function showRecentAttempts(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('login_attempts')
      .select('*')
      .order('attempted_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Erreur:', error);
      return;
    }
    
    console.log(`\n📊 Dernières ${limit} tentatives de connexion:`);
    console.table(data);
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}

// Pour utiliser dans la console du navigateur :
// import { testSupabaseConnection, showRecentAttempts } from './utils/testSupabase'
// testSupabaseConnection()
// showRecentAttempts()


