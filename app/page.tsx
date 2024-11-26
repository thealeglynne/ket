'use client'

import React from 'react';
import LoginForm from './components/LoginForm'; // Importamos el componente LoginForm
import './globals.css'; // Asegúrate de tener el archivo CSS para los estilos

export default function Home() {
  return (
    <div className="home-container">
      <div className="content-container">
        <h1 className="title">Bienvenidos a la Sala de Clases</h1>
        
        {/* Introducción y descripción */}
        <p className="description">
          ¡Bienvenido a nuestra plataforma de aprendizaje! Aquí podrás acceder a
          materiales educativos, interactuar con tus compañeros y profesores, y mucho más. 
          Para comenzar tu experiencia, inicia sesión utilizando tu cuenta.
        </p>
        
        <p className="instruction">
          Si aún no tienes cuenta, puedes registrarte en el formulario de inicio de sesión.
        </p>

        {/* Aquí renderizamos el componente LoginForm */}
        <LoginForm />
        
        {/* Llamada a la acción adicional */}
        <p className="footer-text">
          ¡Comienza ahora y empieza a aprender de manera efectiva!
        </p>
      </div>
    </div>
  );
}
