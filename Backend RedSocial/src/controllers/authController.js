const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Registro de usuario desde CareLibro
exports.registrar = async (req, res) => {
    const {
        nombre,
        email,
        contrasena,
        fecha_nacimiento,
        genero,
        biografia,
        ciudad,
        avatar
    } = req.body;

    const cleanName = typeof nombre === 'string' ? nombre.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const cleanPassword = typeof contrasena === 'string' ? contrasena : '';
    const allowedGenders = ['Hombre', 'Mujer', 'Otro'];
    const parsedDate = typeof fecha_nacimiento === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(fecha_nacimiento)
        ? new Date(`${fecha_nacimiento}T00:00:00Z`)
        : null;
    const dateIsValid = !fecha_nacimiento || (
        parsedDate &&
        !Number.isNaN(parsedDate.getTime()) &&
        parsedDate.toISOString().slice(0, 10) === fecha_nacimiento
    );

    if (!cleanName || cleanName.length > 100) {
        return res.status(400).json({ msg: 'Ingresa un nombre de hasta 100 caracteres.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanEmail.length > 100) {
        return res.status(400).json({ msg: 'Ingresa un correo electrónico válido.' });
    }
    if (cleanPassword.length < 6 || cleanPassword.length > 100) {
        return res.status(400).json({ msg: 'La contraseña debe tener entre 6 y 100 caracteres.' });
    }
    if (!dateIsValid) {
        return res.status(400).json({ msg: 'La fecha de nacimiento no es válida.' });
    }
    if (genero && !allowedGenders.includes(genero)) {
        return res.status(400).json({ msg: 'El género seleccionado no es válido.' });
    }
    if (avatar && (typeof avatar !== 'string' || avatar.length > 4_000_000)) {
        return res.status(400).json({ msg: 'La imagen de perfil es demasiado grande o no es válida.' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(cleanPassword, salt);

        const query = `INSERT INTO usuarios
            (nombre, email, contrasena, biografia, ciudad, avatar, fecha_nacimiento, genero)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.query(query, [
            cleanName,
            cleanEmail,
            passwordHash,
            typeof biografia === 'string' && biografia.trim() ? biografia.trim() : null,
            typeof ciudad === 'string' && ciudad.trim() ? ciudad.trim() : null,
            avatar || 'https://www.w3schools.com/w3images/avatar2.png',
            fecha_nacimiento || null,
            genero || null
        ]);

        res.status(201).json({
            msg: 'Usuario registrado con éxito.',
            usuario: {
                id: result.insertId,
                nombre: cleanName,
                email: cleanEmail,
                biografia: biografia || '',
                ciudad: ciudad || '',
                avatar: avatar || 'https://www.w3schools.com/w3images/avatar2.png',
                fecha_nacimiento: fecha_nacimiento || null,
                genero: genero || null
            }
        });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ msg: 'El correo ya está registrado.' });
        }
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ error: 'No se pudo guardar el usuario en la base de datos.' });
    }
};

// Inicio de sesión (login.html)
exports.login = async (req, res) => {
    const { email, contrasena } = req.body;
    const loginName = typeof email === 'string' ? email.trim() : '';
    if (!loginName || typeof contrasena !== 'string' || !contrasena) {
        return res.status(400).json({ msg: 'Ingresa el correo y la contraseña.' });
    }

    try {
        const [rows] = await db.query(
            'SELECT * FROM usuarios WHERE email = ? OR nombre = ? LIMIT 1',
            [loginName.toLowerCase(), loginName]
        );
        if (rows.length === 0) return res.status(400).json({ msg: "Credenciales inválidas" });

        const usuario = rows[0];

        // Comparar la contraseña ingresada con el hash de la BD
        const esCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!esCorrecta) return res.status(400).json({ msg: "Credenciales inválidas" });

        // En un taller más avanzado aquí se generaría un JWT
        res.json({ 
            msg: "Inicio de sesión exitoso", 
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                biografia: usuario.biografia,
                ciudad: usuario.ciudad,
                avatar: usuario.avatar,
                fecha_nacimiento: usuario.fecha_nacimiento,
                genero: usuario.genero
            }
        });
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({ error: 'No se pudo iniciar sesión en este momento.' });
    }
};