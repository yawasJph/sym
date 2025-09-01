import React, { useState } from 'react';

const googleLogin = () => {
  // Aquí iría la lógica real de login con Google
  alert('Iniciar sesión con Google');
};

const Login = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`login-container${darkMode ? ' dark' : ' light'}`}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
        transition: 'background 0.3s',
      }}
    >
      {/* Formulario */}
      <div className="login-form" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            alignSelf: 'flex-end',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '2rem',
            marginBottom: '2rem',
            color: darkMode ? '#fff' : '#222'
          }}
          aria-label="Cambiar tema"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
        <h2 style={{
          color: darkMode ? '#fff' : '#222',
          marginBottom: '2rem'
        }}>Inicia sesión</h2>
        <button
          onClick={googleLogin}
          style={{
            background: darkMode
              ? 'linear-gradient(90deg,#0f0,#222)'
              : 'linear-gradient(90deg,#0f0,#fff)',
            color: darkMode ? '#fff' : '#222',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '1rem'
          }}
        >
          <span style={{ marginRight: '0.5rem' }}>🔒</span>
          Iniciar sesión con Google
        </button>
      </div>
      {/* Imagen */}
      <div className="login-image" style={{
        flex: 1,
        background: darkMode
          ? 'linear-gradient(135deg,#222,#0f0)'
          : 'linear-gradient(135deg,#fff,#0f0)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Login"
          style={{
            width: '100%',
            maxWidth: '400px',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            objectFit: 'cover'
          }}
        />
      </div>
      {/* Estilos responsivos */}
      <style>{`
        .login-container {
          transition: background 0.3s;
        }
        .login-container.light {
          background: linear-gradient(90deg,#fff,#0f0 80%);
        }
        .login-container.dark {
          background: linear-gradient(90deg,#222,#0f0 80%);
        }
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }
          .login-image {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;