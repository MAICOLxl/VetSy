// backend/controllers/appointmentController.js

// Datos de ejemplo en memoria
let appointments = [
  { id: 1, pet: 'Firulais', owner: 'Juan Pérez', date: '2026-05-01', reason: 'Vacunación' },
  { id: 2, pet: 'Misu', owner: 'María García', date: '2026-05-03', reason: 'Chequeo general' }
];

// GET - Obtener todas las citas
const getAll = (req, res) => {
  res.json(appointments);
};

// GET - Obtener cita por ID
const getById = (req, res) => {
  const { id } = req.params;
  const appointment = appointments.find(a => a.id === parseInt(id));
  if (!appointment) {
    return res.status(404).json({ message: 'Cita no encontrada' });
  }
  res.json(appointment);
};

// POST - Crear cita
const create = (req, res) => {
  const { pet, owner, date, reason } = req.body;
  if (!pet || !owner || !date || !reason) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }
  const newAppointment = {
    id: appointments.length + 1,
    pet,
    owner,
    date,
    reason
  };
  appointments.push(newAppointment);
  res.status(201).json({ message: 'Cita creada', appointment: newAppointment });
};

// PUT - Actualizar cita
const update = (req, res) => {
  const { id } = req.params;
  const appointmentIndex = appointments.findIndex(a => a.id === parseInt(id));
  if (appointmentIndex === -1) {
    return res.status(404).json({ message: 'Cita no encontrada' });
  }
  const { pet, owner, date, reason } = req.body;
  appointments[appointmentIndex] = {
    ...appointments[appointmentIndex],
    pet: pet || appointments[appointmentIndex].pet,
    owner: owner || appointments[appointmentIndex].owner,
    date: date || appointments[appointmentIndex].date,
    reason: reason || appointments[appointmentIndex].reason
  };
  res.json({ message: 'Cita actualizada', appointment: appointments[appointmentIndex] });
};

// DELETE - Eliminar cita
const remove = (req, res) => {
  const { id } = req.params;
  const appointmentIndex = appointments.findIndex(a => a.id === parseInt(id));
  if (appointmentIndex === -1) {
    return res.status(404).json({ message: 'Cita no encontrada' });
  }
  appointments.splice(appointmentIndex, 1);
  res.json({ message: 'Cita eliminada' });
};

export {
  getAll,
  getById,
  create,
  update,
  remove
};
