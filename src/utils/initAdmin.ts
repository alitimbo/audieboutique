import { supabase } from '../lib/supabase';

/**
 * Script d'initialisation pour créer l'administrateur par défaut
 * À exécuter une seule fois lors du premier déploiement
 */
export const initializeDefaultAdmin = async () => {
  const adminEmail = 'admin@audieboutique.com';
  const adminPassword = 'Admin123456';
  
  try {
    console.log('🔧 Initialisation de l\'administrateur par défaut...');
    
    // Vérifier si l'admin existe déjà
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', adminEmail)
      .eq('is_admin', true)
      .single();
    
    if (existingUser) {
      console.log('✅ L\'administrateur par défaut existe déjà');
      return { success: true, message: 'Admin déjà existant' };
    }
    
    // Créer l'utilisateur via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: {
          full_name: 'Administrateur'
        }
      }
    });
    
    if (authError) {
      throw authError;
    }
    
    if (!authData.user) {
      throw new Error('Erreur lors de la création de l\'utilisateur');
    }
    
    // Créer l'entrée dans la table users avec is_admin = true
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: adminEmail,
        full_name: 'Administrateur',
        provider: 'email',
        is_admin: true
      });
    
    if (userError) {
      throw userError;
    }
    
    // Si l'email n'est pas confirmé automatiquement, on peut le confirmer manuellement
    // Note: Cela nécessite des privilèges service_role
    
    console.log('✅ Administrateur par défaut créé avec succès');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Mot de passe: ${adminPassword}`);
    console.log('⚠️  Changez le mot de passe après la première connexion !');
    
    return { 
      success: true, 
      message: 'Administrateur créé avec succès',
      credentials: { email: adminEmail, password: adminPassword }
    };
    
  } catch (error: any) {
    console.error('❌ Erreur lors de l\'initialisation de l\'admin:', error.message);
    return { 
      success: false, 
      message: error.message 
    };
  }
};

/**
 * Fonction utilitaire pour vérifier si un admin existe
 */
export const checkAdminExists = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('email, full_name, created_at')
      .eq('is_admin', true);
    
    if (error) throw error;
    
    return {
      exists: data && data.length > 0,
      admins: data || []
    };
  } catch (error: any) {
    console.error('Erreur lors de la vérification des admins:', error.message);
    return { exists: false, admins: [] };
  }
};

// Fonction pour exécuter le script depuis la console du navigateur
if (typeof window !== 'undefined') {
  (window as any).initAdmin = initializeDefaultAdmin;
  (window as any).checkAdmins = checkAdminExists;
}
