'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "../styes/login.css"; // Asegúrate de tener el archivo CSS para los estilos

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Estado para mostrar el pop-up
  const [loginError, setLoginError] = useState(false); // Estado para el mensaje de error
  const router = useRouter(); // Hook para enrutamiento

  // Verificar si el usuario ya está autenticado al cargar el componente
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      router.push(`/sala/${user}`);  // Redirigir al usuario si ya está autenticado
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/validUsers');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const validUsersData = await response.json();

      if (validUsersData[username] === password) {
        console.log('Inicio de sesión exitoso');
        localStorage.setItem('user', username);  // Almacenar el usuario en localStorage
        setIsPopupVisible(false); // Cerrar el pop-up tras un inicio exitoso
        router.push(`/sala/${username}`);
        setLoginError(false); // Resetear el error si el login es exitoso
      } else {
        console.log('Credenciales inválidas');
        setLoginError(true); // Mostrar el mensaje de error
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setLoginError(true); // Mostrar el mensaje de error en caso de fallo en la solicitud
    }
  };

  return (
    <div className="main">
      {/* Botón de abrir el pop-up */}
      <button
        className="login-btn"
        onClick={() => setIsPopupVisible(true)}
      >
        Iniciar sesión
      </button>

      {/* Fondo de superposición */}
      <div className={`background-overlay ${isPopupVisible ? 'active' : ''}`} onClick={() => setIsPopupVisible(false)}></div>

      {/* Contenedor del Pop-up */}
      <div className={`popup-container ${isPopupVisible ? 'active' : ''}`}>
        <div className="popup-content">
          <button className="close-btn" onClick={() => setIsPopupVisible(false)}>Cerrar</button>
          <h2>Iniciar sesión</h2>
          
          {/* Formulario de login */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submit-btn">Iniciar sesión</button>
          </form>

          {/* Mensaje de error de credenciales incorrectas */}
          {loginError && <p className="error-message">Credenciales incorrectas. Inténtalo de nuevo.</p>}
        </div>
      </div>
    </div>
  );
}
