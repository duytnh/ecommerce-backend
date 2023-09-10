const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleWare } = require("../Middleware/authMiddleware");

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.post('/log-out', userController.logoutUser)
router.put('/update/:id', authUserMiddleWare, userController.updateUser)
router.delete('/delete/:id', authMiddleware, userController.deleteUser)
router.get('/getall', authMiddleware, userController.getAllUser)
router.get('/details/:id', authUserMiddleWare, userController.getDetailsUser)
router.post('/refresh-token', userController.refreshToken)
router.post('/delete-many', authMiddleware, userController.deleteMany)

module.exports = router