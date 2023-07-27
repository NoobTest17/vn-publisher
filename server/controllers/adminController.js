const ApiError = require("../error/ApiError");
const bd = require('../db')

class AdminController {
  async blockUnlock(req, res, next) {
    try {
      // Рассмотреть вариант на добавления базы данных для сообщений о бане
      // Пример
      // const test = {
      //   id: 123123123,
      //   login: 'user',
      //   message: 'Проебался',
      //   dateBan: '01.01.1970',
      //   whoBan: 'slipers',
      // }

      const {login} = req.query
      const [user] = await bd.queryGET(`select * from auth where login=\'${login}\'`)
      if (!user) {
        return next(ApiError.badRequest('Не найден пользователь.'))
      }

      user.access = !user.access
      const updateUser = await bd.queryPUT('auth', user)
      console.log(updateUser)
      res.json({status: 200, message: 'access'})
    } catch (e) {
      console.log(e)
    }
  }

  async applyingAdministrator(req, res, next) {
    try {
      const {login} = req.query
      const [user] = await bd.queryGET(`select * from auth where login=\'${login}\'`)
      if (!user) {
        return next(ApiError.badRequest('Не найден пользователь.'))
      }

      user.admin = !user.admin
      const updateUser = await bd.queryPUT('auth', user)
      console.log(updateUser)
      res.json({status: 200, message: 'access'})
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new AdminController()