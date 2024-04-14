import request from '@/utils/request'

export const adminLoginService = ({ username, password }) =>
  request.post('/admin/login', { username, password })

export const adminGetInfoService = () => request.get('/admin')

export const adminUpdateInfoService = ({ couldRegister }) =>
  request.put('/admin', { couldRegister })

export const adminUpdateAuthService = ({ username, password }) =>
  request.put('/admin/auth', { username, password })

export const adminGetUsersService = () => request.get('/admin/users')

export const adminRegisterUserService = ({ username, password, email }) =>
  request.post('/admin/user/register', { username, password, email })

export const adminUpdateUserPasswordService = ({ userId, newPassword }) =>
  request.put('/admin/user/password', { userId, newPassword })

export const adminDeleteUserService = (userId) =>
  request.delete(`/admin/user/${userId}`)
