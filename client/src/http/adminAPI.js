import {$host} from "./index";

export const getOneUser = async (login) => {
  const response = await $host.get(`api/admin/one_users?login=${login}`)
  return response
}

export const getAllUsers = async () => {
  const response = await $host.get('api/admin/all_users')
  return response
}

export const blockUnlock = async (login) => {
  const response = await $host.get(`api/admin/block_unlock?login=${login}`)
  return response
}

export const applyingAdministrator = async (login) => {
  const response = await $host.get(`api/admin/applying_administrator?login=${login}`)
  return response
}