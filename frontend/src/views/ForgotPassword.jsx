// src/views/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundPeaches from '../components/BackgroundPeaches';
const { supabase } = require('../services/supabaseClient');
const { theme } = require('../theme');

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [uiError, setUiError] = useState(null);
  const [uiSuccess, setUiSuccess] = useState(false);

  async function handleResetRequest(e) {
    e.preventDefault();
    setUiError(null);
    setUiSuccess(false);
    setSubmitting(true);

    // Supabase emails a time-limited link. window.location.origin keeps the
    // redirect correct for localhost and future deployed environments.
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      { redirectTo: `${window.location.origin}/reset-password` }
    );

    setSubmitting(false);

    if (error) {
      setUiError(error.message);
      return;
    }

    // Use a generic response so the page does not reveal whether an email is
    // registered with CheapChomp.
    setUiSuccess(true);
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
      marginTop: '20px',
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
    backText: {
      margin: '24px 0 0',
      textAlign: 'center',
      color: theme.color.textMuted,
      fontSize: '0.9em'
    },
    link: {
      color: theme.color.primary,
      textDecoration: 'none',
      fontWeight: 'bold',
      marginLeft: '5px'
    }
  };

  return (
    <div style={styles.wrapper}>
      <BackgroundPeaches />
      <main style={styles.card}>
        <h2 style={styles.title}>Reset your password</h2>
        <p style={styles.subtitle}>
          Enter your account email and we&apos;ll send you a secure password-reset link.
        </p>

        {uiError && (
          <div style={{ ...styles.message, color: theme.color.danger, background: theme.color.dangerBg }}>
            {uiError}
          </div>
        )}
        {uiSuccess && (
          <div style={{ ...styles.message, color: theme.color.success, background: theme.color.successBg }}>
            If an account exists for that email, a password-reset link has been sent. Check your inbox and spam folder.
          </div>
        )}

        {!uiSuccess && (
          <form onSubmit={handleResetRequest}>
            <label htmlFor="reset-email" style={styles.label}>Email Address</label>
            <input
              id="reset-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              className="bb-input"
              autoComplete="email"
              required
            />

            <button
              type="submit"
              style={styles.submitBtn}
              className="bb-btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Sending link...' : 'Send reset link'}
            </button>
          </form>
        )}

        <p style={styles.backText}>
          Remembered your password?
          <Link to="/login" style={styles.link} className="bb-text-link">Back to Log In</Link>
        </p>
      </main>
    </div>
  );
}

export default ForgotPassword;
