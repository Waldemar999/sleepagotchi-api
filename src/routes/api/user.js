import { Router } from 'express';

const router = Router();

router.post('/signUp', () => console.log('signUp endpoint!'));

router.post('/login', () => console.log('login endpoint!'));

router.put('/setUsername', () => console.log('setUsername endpoint!'));

router.get('/getUsername', () => console.log('getUsername endpoint!'));


export default router;
