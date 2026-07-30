// src/views/ResetPassword.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundPeaches from '../components/BackgroundPeaches';
const { supabase } = require('../services/supabaseClient');
const { theme } = require('../theme');

function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkingLink, setCheckingLink] = useState(true);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uiError, setUiError] = useState(null);
  const [uiSuccess, setUiSuccess] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkRecoverySession() {
      // Supabase parses the recovery link and creates a temporary session that
      // authorizes exactly this authenticated password update.
      const { data, error } = await supabase.auth.getSession();

      if (!active) return;

      setHasRecoverySession(Boolean(data?.session) && !error);
      setCheckingLink(false);
    }

    checkRecoverySession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;

      if (event === 'PASSWORD_RECOVERY' || session) {
        setHasRecoverySession(true);
        setCheckingLink(false);
      }
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function handlePasswordUpdate(e) {
    e.preventDefault();
    setUiError(null);

    if (newPassword !== confirmPassword) {
      setUiError('The passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setUiError('Your password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setUiError(error.message);
      setSubmitting(false);
      return;
    }

    setUiSuccess(true);
    setSubmitting(false);

    // End the temporary recovery session and require a fresh login with the
    // newly selected password.
    await supabase.auth.signOut();
    setTimeout(() => navigate('/login', { replace: true }), 1800);
  }

  const styles = {
    wrapper: {
      position: 'relative',
      zIndex: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      padding: '20px'
    },
    card: {
      width: '100%',
      maxWidth: '430px',
      backgroundColor: theme.color.white,
      padding: '40px 30px',
      borderRadius: theme.radius.lg,
      boxShadow: theme.shadow.panel,
      border: `1px solid ${theme.color.border}`
    },
    title: {
      color: theme.color.primary,
      margin: '0 0 8px',
      fontSize: '2.1em',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    subtitle: {
      color: theme.color.textMuted,
      textAlign: 'center',
      margin: '0 0 28px',
      lineHeight: 1.55
    },
    inputGroup: { marginBottom: '18px' },
    label: {
      display: 'block',
      color: theme.color.text,
      fontWeight: '600',
      marginBottom: '8px',
      fontSize: '0.9em'
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '1em',
      borderRadius: theme.radius.sm,
      border: `1px solid ${theme.color.primaryBorder}`,
      outline: 'none',
      backgroundColor: theme.color.inputBg
    },
    submitBtn: {
      width: '100%',
      padding: '14px',
      background: theme.color.primary,
      color: theme.color.white,
      border: 'none',
      borderRadius: theme.radius.sm,
      fontWeight: 'bold',
      fontSize: '1.02em',
      cursor: submitting ? 'not-allowed' : 'pointer',
      opacity: submitting ? 0.7 : 1,
      boxShadow: theme.shadow.button
    },
    message: {
      padding: '12px',
      borderRadius: theme.radius.sm,
      marginBottom: '20px',
      fontSize: '0.9em',
      lineHeight: 1.45,
      textAlign: 'center'
    },
    linkRow: { margin: '22px 0 0', textAlign: 'center' },
    link: { color: theme.color.primary, textDecoration: 'none', fontWeight: 'bold' }
  };

  return (
    <div style={styles.wrapper}>
      <BackgroundPeaches />
      <main style={styles.card}>
        <h2 style={styles.title}>Choose a new password</h2>

        {checkingLink && <p style={styles.subtitle}>Checking your secure reset link...</p>}

        {!checkingLink && !hasRecoverySession && (
          <>
            <div style={{ ...styles.message, color: theme.color.danger, background: theme.color.dangerBg }}>
              This password-reset link is invalid or has expired. Request a new link to continue.
            </div>
            <p style={styles.linkRow}>
              <Link to="/forgot-password" style={styles.link} className="bb-text-link">
                Request another reset link
              </Link>
            </p>
          </>
        )}

        {!checkingLink && hasRecoverySession && !uiSuccess && (
          <>
            <p style={styles.subtitle}>Enter and confirm the new password for your CheapChomp account.</p>

            {uiError && (
              <div style={{ ...styles.message, color: theme.color.danger, background: theme.color.dangerBg }}>
                {uiError}
              </div>
            )}

            <form onSubmit={handlePasswordUpdate}>
              <div style={styles.inputGroup}>
                <label htmlFor="new-password" style={styles.label}>New Password</label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter a new password"
                  style={styles.input}
                  className="bb-input"
                  autoComplete="new-password"
                  minLength="6"
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="confirm-password" style={styles.label}>Confirm New Password</label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter the password again"
                  style={styles.input}
                  className="bb-input"
                  autoComplete="new-password"
                  minLength="6"
                  required
                />
              </div>

              <button
                type="submit"
                style={styles.submitBtn}
                className="bb-btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Updating password...' : 'Update password'}
              </button>
            </form>
          </>
        )}

        {uiSuccess && (
          <div style={{ ...styles.message, color: theme.color.success, background: theme.color.successBg }}>
            Your password has been updated. Redirecting you to login...
          </div>
        )}
      </main>
    </div>
  );
}

export default ResetPassword;
