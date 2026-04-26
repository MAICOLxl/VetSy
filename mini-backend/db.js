const mysql=require('mysql2');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'picapapa3',
    database:'vetsy'
});

connection.connect((err)=>{
    if(err){
        console.error('Error de conexion:', err);
        return;
    }
    console.log('Conexion exitosa a la base de datos');
});

module.exports=connection;

/*CRUD tabla productos */

/*create */
app.post('/productos', (req, res) => {
  const { nombre, precio } = req.body;

  const sql = 'INSERT INTO productos (nombre, precio) VALUES (?, ?)';

  db.query(sql, [nombre, precio], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Producto creado');
  });
});

/*read */
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

/*read por id */

app.get('/productos/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);

    res.json(result[0]);
  });
});

/*update */

app.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;

  const sql = 'UPDATE productos SET nombre = ?, precio = ? WHERE id = ?';

  db.query(sql, [nombre, precio, id], (err) => {
    if (err) return res.status(500).send(err);

    res.send('Producto actualizado');
  });
});

/*delete */

app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM productos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);

    res.send('Producto eliminado');
  });
});

/*levanta servidor*/

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});