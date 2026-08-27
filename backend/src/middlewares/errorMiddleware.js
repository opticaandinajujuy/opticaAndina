function notFound(req, res, next) {
  res.status(404).json({ message: 'Recurso no encontrado' });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  const message =
    status < 500 ? err.message || 'Error interno del servidor' : 'Ocurrió un error. Probá de nuevo en unos minutos.';
  res.status(status).json({ message });
}

module.exports = { notFound, errorHandler };
