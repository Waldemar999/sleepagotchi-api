import { Router } from 'express';
import UserService from '../../service/user/index.js';
import AuthService from '../../service/auth/index.js';
import { authenticateToken } from '../../middlewares/authenticate.js';

const router = Router();
const userService = new UserService();
const authService = new AuthService();

/**
  * @openapi
  * '/api/user/signUp':
  *  post:
  *     tags:
  *     - User
  *     summary: Register a user
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *              $ref: '#/components/schemas/CreateUserInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/CreateUserResponse'
  */
router.post('/signUp', async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // TODO: add checking if user already exist

    const user = await userService.create({ email, username, password });

    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

  /**
    * @openapi
    * '/api/user/login':
    *  post:
    *     tags:
    *     - User
    *     summary: Login a user
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *             type: object
    *             required:
    *               - email
    *               - password
    *             properties:
    *               email:
    *                 type: string
    *                 default: jane.doe@example.com
    *               password:
    *                 type: string
    *                 default: password1234
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              type: object
    *              properties:
    *               accessToken:
    *                 type: string
    */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const acessToken = await authService.login(email, password);

    res.status(200).send({ acessToken });
  } catch (error) {
    next(error);
  }
});

  /**
    * @openapi
    * '/api/user/setUsername':
    *  put:
    *     tags:
    *     - User
    *     summary: Set new username for particular user
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *             type: object
    *             required:
    *               - email
    *               - username
    *             properties:
    *               email:
    *                 type: string
    *                 default: jane.doe@example.com
    *               username:
    *                 type: string
    *                 default: JaneDoe
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              type: boolean
    */
router.put('/setUsername', authenticateToken, async (req, res, next) => {
  try {
    const { email, username } = req.body;

    await userService.setUsername(email, username);

    res.status(200).send(true);

  } catch (error) {
    next(error);
  }
});

  /**
    * @openapi
    * '/api/user/getUsername':
    *  get:
    *     tags:
    *     - User
    *     summary: Get username for particular user
    *     parameters:
    *      - name: email
    *        in: path
    *        description: The email of the user
    *        required: true
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              type: object
    *              properties:
    *               email:
    *                 type: string
    *               username:
    *                 type: string
    */
router.get('/getUsername', authenticateToken, async (req, res, next) => {
  try {
    const { email } = req.body; // TODO: remove body and use query

    const { username } = await userService.getUserByEmail(email);

    res.status(200).send({ email, username });
  } catch (error) {
    next(error);
  }
});

export default router;
