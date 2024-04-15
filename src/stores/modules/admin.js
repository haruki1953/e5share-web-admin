import { adminGetInfoService } from '@/api/admin'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAdminStore = defineStore(
  'e5admin-admin',
  () => {
    const username = ref('')
    const couldRegister = ref(true)
    // 请求获取分享信息
    const getAdminInfo = async () => {
      const res = await adminGetInfoService()
      username.value = res.data.data.username
      couldRegister.value = res.data.data.couldRegister
    }

    // 清除信息
    const removeInfo = () => {
      username.value = ''
      couldRegister.value = null
    }

    return {
      username,
      couldRegister,
      getAdminInfo,
      removeInfo
    }
  },
  {
    persist: true // 持久化
  }
)
