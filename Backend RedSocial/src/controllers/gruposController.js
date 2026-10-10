const db = require('../config/db');

exports.listarGrupos = async (req, res) => {
    try {
        // DQL: Contando miembros por grupo (Agregación)
        const [rows] = await db.query(`
            SELECT g.*, COUNT(m.usuario_id) AS total_miembros 
            FROM grupos g 
            LEFT JOIN miembros_grupos m ON g.id = m.grupo_id 
            GROUP BY g.id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.unirseAGrupo = async (req, res) => {
    const usuarioId = Number(req.body.usuario_id);
    const grupoId = Number(req.body.grupo_id);

    if (!Number.isInteger(usuarioId) || usuarioId < 1 || !Number.isInteger(grupoId) || grupoId < 1) {
        return res.status(400).json({ msg: 'Se requieren usuario_id y grupo_id válidos.' });
    }

    try {
        const [grupos] = await db.query('SELECT id FROM grupos WHERE id = ?', [grupoId]);
        const [usuarios] = await db.query('SELECT id FROM usuarios WHERE id = ?', [usuarioId]);

        if (!grupos.length || !usuarios.length) {
            return res.status(404).json({ msg: 'No se encontró el usuario o el grupo.' });
        }

        const [result] = await db.query(
            'INSERT IGNORE INTO miembros_grupos (grupo_id, usuario_id) VALUES (?, ?)',
            [grupoId, usuarioId]
        );
        const alreadyJoined = result.affectedRows === 0;
        res.status(alreadyJoined ? 200 : 201).json({
            msg: alreadyJoined ? 'El usuario ya pertenece al grupo.' : 'Usuario agregado al grupo.'
        });
    } catch (err) {
        console.error('Error al unirse al grupo:', err);
        res.status(500).json({ error: 'No se pudo agregar el usuario al grupo.' });
    }
};