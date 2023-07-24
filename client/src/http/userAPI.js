import {$host, $authHost} from "./index"

export const registration = async (login, password, codeHistory) => {
  const response = await $host.post('api/user/registration', {login, password, codeHistory})
  return response
}

export const login = async (login, password, rule) => {
  const response = await $host.post('api/user/login', {login, password, rule})
  return response
}

export const check = async () => {
  const response = await $host.post('api/user/registration')
  return response
}