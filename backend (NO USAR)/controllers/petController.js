// backend/controllers/petController.js

// Datos de ejemplo en memoria
let pets = [
  { id: 1, name: 'Firulais', type: 'Perro', owner: 'Juan Pérez' },
  { id: 2, name: 'Misu', type: 'Gato', owner: 'María García' }
];

// GET - Obtener todas las mascotas
const getAll = (req, res) => {
  res.json(pets);
};

// GET - Obtener mascota por ID
const getById = (req, res) => {
  const { id } = req.params;
  const pet = pets.find(p => p.id === parseInt(id));
  if (!pet) {
    return res.status(404).json({ message: 'Mascota no encontrada' });
  }
  res.json(pet);
};

// POST - Crear mascota
const create = (req, res) => {
  const { name, type, owner } = req.body;
  if (!name || !type || !owner) {
    return res.status(400).json({ message: 'Nombre, tipo y dueño son requeridos' });
  }
  const newPet = {
    id: pets.length + 1,
    name,
    type,
    owner
  };
  pets.push(newPet);
  res.status(201).json({ message: 'Mascota creada', pet: newPet });
};

// PUT - Actualizar mascota
const update = (req, res) => {
  const { id } = req.params;
  const petIndex = pets.findIndex(p => p.id === parseInt(id));
  if (petIndex === -1) {
    return res.status(404).json({ message: 'Mascota no encontrada' });
  }
  const { name, type, owner } = req.body;
  pets[petIndex] = {
    ...pets[petIndex],
    name: name || pets[petIndex].name,
    type: type || pets[petIndex].type,
    owner: owner || pets[petIndex].owner
  };
  res.json({ message: 'Mascota actualizada', pet: pets[petIndex] });
};

// DELETE - Eliminar mascota
const remove = (req, res) => {
  const { id } = req.params;
  const petIndex = pets.findIndex(p => p.id === parseInt(id));
  if (petIndex === -1) {
    return res.status(404).json({ message: 'Mascota no encontrada' });
  }
  pets.splice(petIndex, 1);
  res.json({ message: 'Mascota eliminada' });
};

export {
  getAll,
  getById,
  create,
  update,
  remove
};
