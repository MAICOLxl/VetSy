// backend/controllers/billingController.js

// Datos de ejemplo en memoria
let bills = [
  { id: 1, client: 'Juan Pérez', amount: 1200, date: '2026-05-01', details: 'Consulta y vacuna' },
  { id: 2, client: 'María García', amount: 800, date: '2026-05-03', details: 'Chequeo general' }
];

// GET - Obtener todas las facturas
const getAll = (req, res) => {
  res.json(bills);
};

// GET - Obtener factura por ID
const getById = (req, res) => {
  const { id } = req.params;
  const bill = bills.find(b => b.id === parseInt(id));
  if (!bill) {
    return res.status(404).json({ message: 'Factura no encontrada' });
  }
  res.json(bill);
};

// POST - Crear factura
const create = (req, res) => {
  const { client, amount, date, details } = req.body;
  if (!client || !amount || !date || !details) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }
  const newBill = {
    id: bills.length + 1,
    client,
    amount,
    date,
    details
  };
  bills.push(newBill);
  res.status(201).json({ message: 'Factura creada', bill: newBill });
};

// PUT - Actualizar factura
const update = (req, res) => {
  const { id } = req.params;
  const billIndex = bills.findIndex(b => b.id === parseInt(id));
  if (billIndex === -1) {
    return res.status(404).json({ message: 'Factura no encontrada' });
  }
  const { client, amount, date, details } = req.body;
  bills[billIndex] = {
    ...bills[billIndex],
    client: client || bills[billIndex].client,
    amount: amount || bills[billIndex].amount,
    date: date || bills[billIndex].date,
    details: details || bills[billIndex].details
  };
  res.json({ message: 'Factura actualizada', bill: bills[billIndex] });
};

// DELETE - Eliminar factura
const remove = (req, res) => {
  const { id } = req.params;
  const billIndex = bills.findIndex(b => b.id === parseInt(id));
  if (billIndex === -1) {
    return res.status(404).json({ message: 'Factura no encontrada' });
  }
  bills.splice(billIndex, 1);
  res.json({ message: 'Factura eliminada' });
};

export {
  getAll,
  getById,
  create,
  update,
  remove
};
