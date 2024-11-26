'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.css';

const Sala = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [messageToEdit, setMessageToEdit] = useState({});
  const [user, setUser] = useState(null); // Para guardar el usuario logueado
  const router = useRouter();

  // Simulación de autenticación usando localStorage
  useEffect(() => {
    const loggedUser = localStorage.getItem('user'); // Verifica si hay un usuario logueado
    if (!loggedUser) {
      router.push('/login'); // Si no está logueado, redirige a la página de login
    } else {
      setUser(loggedUser); // Si está logueado, se guarda el usuario
    }
  }, [router]);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('user'); // Elimina al usuario del localStorage
    router.push('/'); // Redirige al usuario a la página de login
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const newMsg = {
      id: messages.length + 1,
      user: user,
      message: newMessage,
      isModerator: user === 'moderator', // Simula si el usuario es moderador
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleDeleteMessage = (id) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
  };

  const handleEditMessage = (id) => {
    const messageToEdit = messages.find((msg) => msg.id === id);
    setEditMode(true);
    setMessageToEdit(messageToEdit);
    setNewMessage(messageToEdit.message);
  };

  const handleUpdateMessage = (e) => {
    e.preventDefault();
    const updatedMessage = {
      id: messageToEdit.id,
      user: messageToEdit.user,
      message: newMessage,
    };
    const updatedMessages = messages.map((msg) =>
      msg.id === updatedMessage.id ? updatedMessage : msg
    );
    setMessages(updatedMessages);
    setEditMode(false);
    setNewMessage('');
  };

  return (
    <div className="sala-container">
      <div className="video-container">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Ejemplo de video
          title="Clase Virtual"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h1>Bienvenido a la Sala de {user}</h1>
      
      {/* Botón de Cerrar sesión */}
      <button onClick={handleLogout}>Cerrar sesión</button>

      <div className="chat-container">
        <div className="messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.isModerator ? 'moderator' : ''}`}>
              <strong>{msg.user}:</strong> {msg.message}
              {msg.isModerator ? <span>(Moderador)</span> : null}
              <button onClick={() => handleDeleteMessage(msg.id)}>Eliminar</button>
              <button onClick={() => handleEditMessage(msg.id)}>Editar</button>
            </div>
          ))}
        </div>
        {editMode ? (
          <form onSubmit={handleUpdateMessage}>
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit">Actualizar</button>
          </form>
        ) : (
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Sala;
