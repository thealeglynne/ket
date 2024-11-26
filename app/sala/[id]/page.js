'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.css'; // Asegúrate de que esta ruta coincida con tu archivo CSS

const Sala = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [messageToEdit, setMessageToEdit] = useState({});
  const [user, setUser] = useState(null); // Para guardar el usuario logueado
  const router = useRouter();

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (!loggedUser) {
      router.push('/page');
    } else {
      setUser(loggedUser); // Establecer el usuario logueado
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const newMessageObj = {
      id: Date.now(),
      user: user,
      message: newMessage,
      isModerator: user === 'moderator',
    };

    setMessages((prevMessages) => [...prevMessages, newMessageObj]);
    setNewMessage('');
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const handleEditMessage = (id) => {
    const messageToEdit = messages.find((msg) => msg.id === id);
    setEditMode(true);
    setMessageToEdit(messageToEdit);
    setNewMessage(messageToEdit.message);
  };

  const handleUpdateMessage = (e) => {
    e.preventDefault();

    const updatedMessages = messages.map((msg) =>
      msg.id === messageToEdit.id ? { ...msg, message: newMessage } : msg
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
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Clase Virtual"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h1>Bienvenido {user}</h1> 
      
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.isModerator ? 'moderator' : ''}`}>
              <p>{msg.message}</p>
              <span>{msg.user}</span>
              {msg.isModerator && <span className="moderator-tag">(Moderador)</span>}
              <button onClick={() => handleDeleteMessage(msg.id)}>Eliminar</button>
              <button onClick={() => handleEditMessage(msg.id)}>Editar</button>
            </div>
          ))}
        </div>

        <form onSubmit={editMode ? handleUpdateMessage : handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje"
          />
          <button type="submit">{editMode ? 'Actualizar' : 'Enviar'}</button>
          
        </form>
        
      </div>
      <button onClick={handleLogout} className="logout-btnL">Cerrar sesión</button>

    </div>
  );
};

export default Sala;
