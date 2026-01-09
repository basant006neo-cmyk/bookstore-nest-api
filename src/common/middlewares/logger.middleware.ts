export function requestLogger(req, res, next) {
  console.log(`[HTTP] ${req.method} ${req.url}`);
  next();
}
