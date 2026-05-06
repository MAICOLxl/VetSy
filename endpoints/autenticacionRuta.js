import express from "express";
import { pool } from "../configuracionDB/db.js";

const router = express.Router();

router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const sql = `
            SELECT *
            FROM usuario
            WHERE username = ?
        `;

        const [result] = await pool.query(sql, [username]);

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
                username: user.username,
                rol: user.rol
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error del servidor"
        });

    }

});

export default router;