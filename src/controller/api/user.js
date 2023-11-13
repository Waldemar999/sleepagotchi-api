import { Router } from 'express';
import UserService from '../../service/user/index.js';
import AuthService from '../../service/auth/index.js';
import { authenticateToken } from '../../middlewares/authenticate.js';

const router = Router();
const userService = new UserService();
const authService = new AuthService();

router.post('/signUp', async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const user = await userService.create({ email, username, password });

    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const acessToken = await authService.login(email, password);

    res.status(200).send({ acessToken });
  } catch (error) {
    next(error);
  }
});

router.put('/setUsername', authenticateToken, async (req, res, next) => {
  try {
    const { email, username } = req.body;

    await userService.setUsername(email, username);

    res.status(200).send(true);

  } catch (error) {
    next(error);
  }
});

router.get('/getUsername', authenticateToken, async (req, res, next) => {
  try {
    const { email } = req.body;

    const { username } = await userService.getUserByEmail(email);

    res.status(200).send({ email, username });
  } catch (error) {
    next(error);
  }
});

export default router;
