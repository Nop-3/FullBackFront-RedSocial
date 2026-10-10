import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSocial } from '../context/SocialContext';
import { loginWithApi } from '../utils/authApi';

export default function LoginPage() {
  const { usersList, login } = useSocial();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirigir a la página previa o al feed
  const from = location.state?.from?.pathname || '/';

  const handleFormLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!email.trim()) {
      setErrorMsg('Por favor ingresa tu correo electrónico o nombre de usuario.');
      return;
    }

    if (!password.trim()) {
      setErrorMsg('Por favor ingresa tu contraseña.');
      return;
    }

    setIsSubmitting(true);
    try {
      const foundUser = await loginWithApi(email.trim(), password);
      setErrorMsg('');
      login(foundUser);
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMsg(error.message || 'No se pudo iniciar sesión.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = (user) => {
    login(user);
    navigate(from, { replace: true });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', display: 'flex', flexDirection: 'column' }}>
      {/* Barra de navegación superior simplificada */}
      <div className="w3-bar w3-theme-d2 w3-padding" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/login" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }} aria-label="CareLibro">
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>CareLibro</span>
        </Link>
        <div>
          <Link to="/login" className="w3-button w3-theme-d4 w3-round" style={{ marginRight: '8px', fontSize: '13px' }}>
            <i className="fa fa-sign-in"></i> Iniciar sesión
          </Link>
          <Link to="/registro" className="w3-button w3-theme-l1 w3-round" style={{ fontSize: '13px' }}>
            <i className="fa fa-user-plus"></i> Registrarse
          </Link>
        </div>
      </div>

      {/* Contenedor central */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px 16px' }}>
        <div style={{ maxWidth: '940px', width: '100%', display: 'flex', gap: '36px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Lado izquierdo: Bienvenida visual */}
          <div style={{ flex: '1 1 360px', maxWidth: '440px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <h1 style={{ margin: 0, fontWeight: 800, fontSize: '38px', color: '#1877f2' }}>
                CareLibro
              </h1>
            </div>
            <p style={{ fontSize: '18px', lineHeight: 1.45, color: '#1c1e21', margin: '0 0 20px 0' }}>
              Conéctate con amigos, comparte momentos multimedia y descubre comunidades activas.
            </p>
            <div style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }}>
              <img
                src="https://www.w3schools.com/w3images/forest.jpg"
                alt="Comunidad"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          {/* Lado derecho: Formulario de Login */}
          <div style={{ flex: '1 1 400px', maxWidth: '440px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 6px 24px rgba(0,0,0,0.12)', padding: '24px' }}>
            <div className="w3-container w3-theme-d2 w3-round-large w3-padding-16 w3-center" style={{ marginBottom: '18px' }}>
              <h3 style={{ margin: 0, fontWeight: 700 }}>
                <i className="fa fa-lock w3-margin-right"></i>Iniciar sesión
              </h3>
            </div>

            {errorMsg && (
              <div className="w3-pale-red w3-padding w3-round w3-small" style={{ marginBottom: '14px', borderLeft: '4px solid #e41e3f' }}>
                <i className="fa fa-exclamation-triangle" style={{ marginRight: '6px' }}></i>
                {errorMsg}
              </div>
            )}

            <div style={{ backgroundColor: '#e7f3ff', borderLeft: '4px solid #1877f2', padding: '10px 12px', borderRadius: '4px', fontSize: '12px', color: '#1c1e21', marginBottom: '16px' }}>
              <i className="fa fa-info-circle" style={{ color: '#1877f2', marginRight: '6px' }}></i>
              <strong>Verificación activa:</strong> Por seguridad, ingresa tus credenciales registradas para iniciar sesión.
            </div>

            <form onSubmit={handleFormLogin}>
              <div className="w3-section">
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#050505' }}>
                  <i className="fa fa-envelope w3-margin-right w3-text-theme"></i>Correo electrónico:
                </label>
                <input
                  className="w3-input w3-border w3-round"
                  type="email"
                  placeholder="ejemplo@carelibro.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="w3-section">
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#050505' }}>
                  <i className="fa fa-key w3-margin-right w3-text-theme"></i>Contraseña:
                </label>
                <input
                  className="w3-input w3-border w3-round"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w3-button w3-theme-d2 w3-round w3-block"
                style={{ fontWeight: 700, padding: '10px', fontSize: '15px', marginTop: '10px' }}
              >
                <i className="fa fa-sign-in"></i> Acceder
              </button>
            </form>

            <hr style={{ margin: '20px 0' }} />

            {/* Acceso rápido en 1 clic */}
            <p style={{ fontSize: '12.5px', color: '#65676b', margin: '0 0 8px 0', textAlign: 'center', fontWeight: 600 }}>
              O ingresa al instante con una cuenta registrada:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
              {usersList.slice(0, 4).map((u) => (
                <div
                  key={u.id}
                  onClick={() => handleQuickLogin(u)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e4e6eb',
                    cursor: 'pointer',
                    backgroundColor: '#fafbfc'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f2f5'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fafbfc'}
                >
                  <img src={u.avatar} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} alt={u.name} />
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '13px', display: 'block', color: '#050505' }}>{u.name}</strong>
                    <span style={{ fontSize: '11px', color: '#65676b' }}>{u.role}</span>
                  </div>
                  <span className="w3-text-blue" style={{ fontSize: '12px', fontWeight: 600 }}>Entrar →</span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
              ¿No tienes una cuenta aún?{' '}
              <Link to="/registro" style={{ color: '#1877f2', fontWeight: 700, textDecoration: 'none' }}>
                Regístrate aquí
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
