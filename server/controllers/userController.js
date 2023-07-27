const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require("uuid");
const bd = require('../db');

const getPreviousDayWithTime = () => {
  const now = new Date()
  const previousDay = new Date(now)
  previousDay.setDate(now.getDate() - 1)
  previousDay.setHours(23)
  previousDay.setMinutes(0)
  previousDay.setSeconds(0)
  previousDay.setMilliseconds(0)
  return previousDay.getTime()
}

const generateJwt = ({login, vnjson, admin, expiration, access}) => {
  return jwt.sign({login, vnjson, admin, expiration, access}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

const checkUserRoleAccess = (rule, {admin, vnjson, expiration}) => {
  if (rule === 'admin' && !admin) {
    return {error: true, message: 'Нет прав администратора'}
  }
  if (rule === 'author' && !vnjson) {
    return {error: true, message: 'Нет прав автора'}
  }
  return {error: false, message: ''}
}

class UserController {
  async registration(req, res, next) {
    try {
      const {login, password, codeHistory} = req.body
      console.log(req.body)

      if (!login || !password) {
        return next(ApiError.badRequest('Некорректный логин или пароль'))
      }
      const isExistingLogin = await bd.queryGET(`select * from auth where login=\'${login}\'`)
      console.log(isExistingLogin)
      if (isExistingLogin[0]) {
        return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
      }
      const registrationUser = {
        login, access: true, admin: false, vnjson: '', expiration: getPreviousDayWithTime()
      }
      if (codeHistory) {
        // Проверка кода истории
        // Если код корректный
        registrationUser.vnjson = codeHistory
      }

      // Добавить случайное количество хеширование от 5
      registrationUser.digest = await bcrypt.hash(password, 5);

      const newUser = await bd.queryPOST('auth', JSON.stringify(registrationUser));
      console.log(newUser)
      const token = generateJwt(registrationUser);
      return res.json({token})
    } catch (e) {
      console.log(e)
    }
  }

  async login(req, res, next) {
    const {login, password, rule} = req.body

    const [user] = await bd.queryGET(`select * from auth where login=\'${login}\'`)
    if (!user) {
      return next(ApiError.badRequest('Пользователь с таким логином не найден'))
    }
    const comparePassword = bcrypt.compareSync(password, user.digest);
    if (!comparePassword) {
      return next(ApiError.badRequest('Указанный пароль неверный'))
    }
    if (!user.access) {
      return next(ApiError.badRequest('Закрыт доступ к аккаунту'))
    }
    // console.log(user)
    // console.log(rule)

    const isLogin = checkUserRoleAccess(rule, user)
    if (isLogin.error) {
      return next(ApiError.badRequest(isLogin.message))
    }

    delete user.digest
    console.log(user)
    const token = generateJwt(user);
    return res.json({token, user})
    // const {email, password} = req.body
    // const [user] = await bd.query(`select * from test where email=\'${email}\'`)
    // if (!user) {
    //   return next(ApiError.badRequest('Пользователь с таким email не найден'))
    // }
    // const comparePassword = bcrypt.compareSync(password, user.password);
    // if (!comparePassword) {
    //   return next(ApiError.badRequest('Указан неверный пароль'))
    // }
    // const token = generateJwt(user.id, email)
    // return res.json({token})

  }

  async check(req, res, next) {
    // const token = generateJwt(req.user.id, req.user.email)
    // res.json({token})
  }
}

module.exports = new UserController();