const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Leer el token del header de la petición
  const auth = req.headers['authorization'];

  // Verificamos que el header existe y que empieza por Bearer
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  const token = auth.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
