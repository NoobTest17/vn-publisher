const ApiError = require("../error/ApiError");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require("uuid");

const generateJwt = (id, email) => {
  return jwt.sign(
    {id, email},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class UserController {
  async registration(req, res, next) {
    const {email, password} = req.body
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или пароль'))
    }
    // Проверка наличие пользователя с таким email
    const candidate = await axios.get('')
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const userId = uuidv4();
    const user = await axios.get(''); // Регистрация пользователя в базу данных Отправка данных объект {email, password: hashPassword, id: userId}
    const token = generateJwt(userId, email);
    return res.json({token})
  }

  async login(req, res, next) {

  }

  async check(req, res, next) {
    const {id} = req.query
    if (!id) {
      next(ApiError)
    }
    res.json(id);
  }
}

module.exports = new UserController();