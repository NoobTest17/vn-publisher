import {makeAutoObservable} from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false
    this._user = {}
    this._selectedRole = {}
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this._isAuth = bool
  }

  setUser(user) {
    this._user = user
  }

  setSelectedRole(role) {
    this._selectedRole = role
  }

  get isAuth() {
    return this._isAuth
  }
  get user() {
    return this._user
  }
  get selectedRole() {
    return this._selectedRole
  }
}