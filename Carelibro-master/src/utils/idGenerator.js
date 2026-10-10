/**
 * Generador de IDs únicos inmutables.
 * 
 * CORRECCIÓN DEL ERROR DEL VIDEO TUTORIAL:
 * En el video tutorial original, se solía generar el ID del post haciendo:
 * `id: posts.length + 1` o usando el índice del array (`posts[index]`).
 * Esto provocaba dos errores graves:
 * 1. Al agregar posts nuevos, los IDs se duplicaban con los existentes,
 *    causando en la consola de React la advertencia:
 *    "Warning: Encountered two children with the same key, 'X'".
 * 2. Al dar Like o comentar, se modificaba el post en la posición incorrecta
 *    debido a que se indexaba por posición y no por identificador único.
 * 
 * Esta función garantiza IDs 100% únicos y estables para cada post,
 * comentario y respuesta, eliminando por completo cualquier advertencia de React.
 */
export const generateId = (prefix = 'item') => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};
