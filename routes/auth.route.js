const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
    '/register',
    [
        check('login', 'Login should not be empty').notEmpty(),
        check('password', 'Minimal password length is 6 characters')
            .isLength({ min: 6 })
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid registration data'
                })
            }

            const {login, password} = request.body

            const candidate = await User.findOne({ login })

            if (candidate) {
                return response.status(400).json({ message: 'User with such login is already exists' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ login, password: hashedPassword })

            await user.save()

            response.status(201).json({ message: 'User successfully created' })

        } catch (e) {
            response.status(500).json({ message: 'Something went wrong, try again later.' })
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Password should not be empty').exists()
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid login data'
                })
            }

            const {email, password} = request.body

            const user = await User.findOne({ email })

            if (!user) {
                return response.status(400).json({ message: 'Cannot find such user' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return response.status(400).json({ message: 'Incorrect email' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            response.json({ token, userId: user.id })

        } catch (e) {
            response.status(500).json({ message: 'Something went wrong, try again later.' })
        }
    })


module.exports = router