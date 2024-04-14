import { useAuthStore, useUsersStore, useAdminStore } from '@/stores'

// 鉴权信息
const authStore = useAuthStore()
// 用户列表
const usersStore = useUsersStore()
// 管理信息
const adminStore = useAdminStore()

// 请求获取全部数据
export const loadAllData = async () => {
  // 判断是否登录，未登录则返回
  if (!authStore.token) return

  // 获取用户列表
  // 获取管理信息
  // 等待所有请求完成
  await Promise.all([usersStore.getUsers(), adminStore.getAdminInfo()])
}

// 请求获取用户信息
export const loadUserData = async () => {
  await usersStore.getUsers()
}

// 请求获取管理信息
export const loadAdminData = async () => {
  await adminStore.getAdminInfo()
}

// 退出登录
export const removeLogin = async () => {
  // 清除本地的数据
  authStore.removeToken()
  adminStore.removeInfo()
}
