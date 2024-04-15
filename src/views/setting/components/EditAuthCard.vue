<script setup>
import { ref, onMounted } from 'vue'
import { userRules } from '@/config/rules'
import { adminUpdateAuthService } from '@/api/admin'
import { useAdminStore } from '@/stores'
import { loadAdminData } from '@/utils/dataManage'

// 表单组件
const form = ref()

const authForm = ref({
  username: '',
  password: ''
})
const rules = userRules

const adminStore = useAdminStore()
// 显示原数据
const showOldData = () => {
  form.value.resetFields()
  authForm.value.username = adminStore.username
}
onMounted(() => {
  showOldData()
})

// 提交中状态标记
const isSubmitting = ref(false)
// 提交修改登录信息
const submitAuth = async () => {
  // 预校验
  await form.value.validate()
  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用修改密码的接口
    await adminUpdateAuthService(authForm.value)
    // 重新加载数据
    await loadAdminData()
    ElMessage.success('修改成功')
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
    // 重置数据
    showOldData()
  }
}
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <el-text tag="b" size="large"> 修改管理员登录信息 </el-text>
    </template>
    <el-form
      :model="authForm"
      :rules="rules"
      ref="form"
      label-width="80px"
      size="large"
      autocomplete="off"
      v-loading="isSubmitting"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="authForm.username"
          placeholder="用户名"
          @keydown.enter.prevent
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="authForm.password"
          placeholder="密码"
          @keydown.enter.prevent
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitAuth">保存</el-button>
        <el-button type="info" @click="showOldData"> 还原 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
