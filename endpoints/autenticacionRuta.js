import express from "express";
import conexion from "../configuracionDB/db.js";

const router = express.Router();

router.post("/login", (req, res) => {

    const { username, password } = req.body;

    const sql = `
        SELECT * 
        FROM usuario 
        WHERE username = ?
    `;

    conexion.query(sql, [username], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {

            return res.status(401).json({
                message: "Usuario no existe"
            });

        }

        const user = result[0];

        if (user.password !== password) {

            return res.status(401).json({
                message: "Contraseña incorrecta"
            });

        }

        res.json({
            message: "Login exitoso",
            user: {
                id: user.idUsuario,
                nombre: user.nombre,
                rol: user.rol
            }
        });

    });

});

export default router;