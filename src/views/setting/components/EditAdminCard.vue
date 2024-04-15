<script setup>
import { ref, onMounted, computed } from 'vue'
import { adminUpdateInfoService } from '@/api/admin'
import { useAdminStore } from '@/stores'
import { loadAdminData } from '@/utils/dataManage'

// 表单组件
const form = ref()
const adminForm = ref({
  couldRegister: true
})

const adminStore = useAdminStore()
// 显示原数据
const showOldData = () => {
  form.value.resetFields()
  adminForm.value.couldRegister = adminStore.couldRegister
}
onMounted(() => {
  showOldData()
})

// 判断当前表单是否和原来相同
const isFormUnchanged = computed(() => {
  return adminForm.value.couldRegister === adminStore.couldRegister
})

// 提交中状态标记
const isSubmitting = ref(false)
// 提交修改管理信息
const submitAdmin = async () => {
  // 预校验
  await form.value.validate()

  if (isFormUnchanged.value) {
    ElMessage('表单未修改')
    showOldData()
    return
  }

  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用修改管理信息的接口
    await adminUpdateInfoService(adminForm.value)
    // 重新加载数据
    await loadAdminData()
    // 重置数据
    showOldData()
    ElMessage.success('修改成功')
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}
</script>
<template>
  <el-card shadow="hover">
    <template #header>
      <el-text tag="b" size="large"> 修改管理信息 </el-text>
    </template>
    <el-form
      :model="adminForm"
      ref="form"
      size="large"
      autocomplete="off"
      v-loading="isSubmitting"
    >
      <el-form-item prop="couldRegister">
        <el-switch
          v-model="adminForm.couldRegister"
          active-text="用户注册已开启"
          inactive-text="用户注册已关闭"
          inline-prompt
          size="large"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitAdmin">保存</el-button>
        <el-button type="info" @click="showOldData"> 还原 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
