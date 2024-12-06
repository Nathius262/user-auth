import { Router } from "express";
import { login, logout, registerUser } from "../controller/auth.js";

const router = Router();


router.post('/register', registerUser);

router.route('/login')
    .post(login);

router.route('/logout')
    .get(logout);

export default router;