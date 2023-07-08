const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require("uuid");
const bd = require('../db');

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
    const candidate = await bd.query(`select * from test where email=\'${email}\'`)
    if (candidate.length) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const userId = uuidv4();
    // const user = await bd.query(''); // Регистрация пользователя в базу данных Отправка данных объект {email, password: hashPassword, id: userId}
    const token = generateJwt(userId, email);
    return res.json({token})
  }

  async login(req, res, next) {
    const {email, password} = req.body
    const [user] = await bd.query(`select * from test where email=\'${email}\'`)
    if (!user) {
      return next(ApiError.badRequest('Пользователь с таким email не найден'))
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if  (!comparePassword) {
      return next(ApiError.badRequest('Указан неверный пароль'))
    }
    const token = generateJwt(user.id, email)
    return res.json({token})
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email)
    res.json({token})
  }
}

module.exports = new UserController();