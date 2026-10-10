const db = require('../config/db');

exports.listarUsuarios = async (req, res) => {
    const query = typeof req.query.buscar === 'string' ? req.query.buscar.trim() : '';

    if (query.length > 100) {
        return res.status(400).json({ msg: 'La búsqueda no puede superar los 100 caracteres.' });
    }

    const terms = query.split(/\s+/).filter(Boolean);
    const searchableFields = ['nombre', 'ciudad', 'biografia'];
    const conditions = terms.map(() => `(${searchableFields.map(field => `${field} LIKE ?`).join(' OR ')})`);
    const values = terms.flatMap(term => {
        const escapedTerm = term.replace(/[\\%_]/g, '\\$&');
        const value = `%${escapedTerm}%`;
        return searchableFields.map(() => value);
    });

    try {
        const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        const [rows] = await db.query(
            `SELECT id, nombre AS name, 'Miembro de CareLibro' AS role,
                    ciudad AS location, avatar
             FROM usuarios ${where}
             ORDER BY nombre
             LIMIT 50`,
            values
        );
        res.json(rows);
    } catch (err) {
        console.error('Error al buscar usuarios:', err);
        res.status(500).json({ error: 'No se pudo completar la búsqueda de usuarios.' });
    }
};

exports.obtenerPerfil = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ msg: "Usuario no encontrado" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.actualizarConfiguracion = async (req, res) => {
    const { id } = req.params;
    const { biografia, ciudad, genero } = req.body;
    try {
        await db.query('UPDATE usuarios SET biografia = ?, ciudad = ?, genero = ? WHERE id = ?', 
        [biografia, ciudad, genero, id]);
        res.json({ msg: "Configuración actualizada correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};