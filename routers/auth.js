import { Router } from "express";
import { login, logout, registerUser } from "../controller/auth.js";

const router = Router();


router.route('/register')
    .get(async (req, res) => {
        res.sendFile('register.html', {root:'views'})
    })
    .post(registerUser);

router.route('/login')
    .post(login);

router.route('/logout')
    .get(logout);

export default router;