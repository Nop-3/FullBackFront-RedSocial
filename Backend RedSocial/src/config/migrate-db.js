const db = require('./db');

const requiredColumns = {
    avatar: 'LONGTEXT NULL',
    fecha_nacimiento: 'DATE DEFAULT NULL',
    genero: "ENUM('Hombre', 'Mujer', 'Otro') DEFAULT NULL"
};

async function migrateDatabase() {
    try {
        const [tables] = await db.query(
            "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'usuarios'"
        );
        if (tables.length === 0) {
            throw new Error('No existe la tabla usuarios. Ejecuta npm run init-db para crear la base inicialmente.');
        }

        const [columns] = await db.query(
            'SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?',
            ['usuarios']
        );
        const existingColumns = new Set(columns.map(column => column.COLUMN_NAME));

        for (const [column, definition] of Object.entries(requiredColumns)) {
            if (!existingColumns.has(column)) {
                await db.query(`ALTER TABLE usuarios ADD COLUMN ${column} ${definition}`);
            }
        }

        await db.query('ALTER TABLE usuarios MODIFY COLUMN avatar LONGTEXT NULL');
        console.log('Base de datos actualizada para el registro de CareLibro.');
    } catch (error) {
        console.error('No se pudo actualizar la base de datos:', error.message);
        process.exitCode = 1;
    } finally {
        await db.end();
    }
}

migrateDatabase();
