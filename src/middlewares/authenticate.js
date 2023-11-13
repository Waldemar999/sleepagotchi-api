import util from 'util';
import jwt from 'jsonwebtoken';

const jwtVerify = util.promisify(jwt.verify);

export async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      return res.sendStatus(401);
    }

    await jwtVerify(token, process.env.SECRET_KEY);

    next();
  } catch (error) {
    console.error('Authentication middleware error', error);
    res.sendStatus(403);
  }
}
