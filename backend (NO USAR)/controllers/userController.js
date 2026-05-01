// filepath: backend/controllers/userController.js

// Datos de ejemplo en memoria
let users = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'admin' },
  { id: 2, name: 'María García', email: 'maria@example.com', role: 'client' }
];

// GET - Obtener todos los usuarios
const getAll = (req, res) => {
  res.json(users);
};

// GET - Obtener usuario por ID
const getById = (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));
  
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  
  res.json(user);
};

// POST - Crear usuario
const create = (req, res) => {
  const { name, email, role } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: 'Nombre y email son requeridos' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: role || 'client'
  };
  
  users.push(newUser);
  res.status(201).json({ message: 'Usuario creado', user: newUser });
};

// PUT - Actualizar usuario
const update = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === parseInt(id));
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  
  const { name, email, role } = req.body;
  users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    role: role || users[userIndex].role
  };
  
  res.json({ message: 'Usuario actualizado', user: users[userIndex] });
};

// DELETE - Eliminar usuario
const remove = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === parseInt(id));
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  
  users.splice(userIndex, 1);
  res.json({ message: 'Usuario eliminado' });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};