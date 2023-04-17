/*
    path: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const {googleAuth} = require('../controllers/auth');

const { crearUser, login, renewToken, verifyMail } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/new', [
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
], crearUser);

router.post('/verify', [
    check('email', 'El ID es obligatorio').not().isEmpty(),
    validarCampos,
], verifyMail);

router.post('/', [
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
], login);

router.post('/google', googleAuth);

router.get('/renew', validarJWT, renewToken);

router.get('/test', async (req, res = response) => {
    console.log('====== Le dió al test XD');

    return res.status(200).json({
        ok: true,
        msg: 'Todo bien',
    });
});

module.exports = router;