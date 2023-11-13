import { Router } from 'express';
import UserController from '../../controller/userController/index.js';
import AuthController from '../../controller/authController/index.js';
import { authenticateToken } from '../../middlewares/authenticate.js';

const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.post('/signUp', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const user = await userController.create({ email, username, password });

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const acessToken = await authController.login(email, password);

    res.status(200).send({ acessToken });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.put('/setUsername', authenticateToken, () => console.log('setUsername endpoint!'));

router.get('/getUsername', authenticateToken, () => console.log('getUsername endpoint!'));


export default router;
