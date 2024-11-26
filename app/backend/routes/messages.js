// Simulamos una base de datos en memoria
let messages = [];

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // Retornar todos los mensajes
      return res.status(200).json(messages);

    case 'POST':
      // Crear un nuevo mensaje
      const newMessage = req.body;
      messages.push(newMessage);
      return res.status(201).json(newMessage);

    case 'PUT':
      // Actualizar un mensaje existente
      const { id } = req.query;
      const updatedMessage = req.body;
      messages = messages.map((msg) =>
        msg.id === id ? { ...msg, ...updatedMessage } : msg
      );
      return res.status(200).json(updatedMessage);

    case 'DELETE':
      // Eliminar un mensaje
      const { deleteId } = req.query;
      messages = messages.filter((msg) => msg.id !== deleteId);
      return res.status(204).end();

    default:
      return res.status(405).end(); // Método no permitido
  }
}
