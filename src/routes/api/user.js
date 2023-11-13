import { Router } from 'express';
import UserController from '../../controller/userController/index.js';

const router = Router();
const userController = new UserController();

router.post('/signUp', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    
    const user = await userController.create({ email, username, password });

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/login', () => console.log('login endpoint!'));

router.put('/setUsername', () => console.log('setUsername endpoint!'));

router.get('/getUsername', () => console.log('getUsername endpoint!'));


export default router;
