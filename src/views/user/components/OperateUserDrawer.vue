<script setup>
import { ref } from 'vue'
import { userRules } from '@/config/rules'
import {
  adminDeleteUserService,
  adminUpdateUserPasswordService
} from '@/api/admin'
import { loadAllData } from '@/utils/dataManage'

const props = defineProps({
  // e5帐号主的id
  e5id: {
    required: true,
    type: Number
  }
})
// 控制抽屉显示隐藏
const visibleDrawer = ref(false)
const open = () => {
  // 显示抽屉
  visibleDrawer.value = true
  // 开启时重置表单
  passwordForm.value.newPassword = ''
  passwordForm.value.rePassword = ''
}

// 导出open方法
defineExpose({
  open
})

// 表单组件
const form = ref()

// 用于提交的form数据对象
const passwordForm = ref({
  newPassword: '',
  rePassword: ''
})

// 校验规则
const rules = {
  newPassword: userRules.password,
  rePassword: [
    {
      validator: (rule, value, callback) => {
        // 判断 value 和 当前 passwordForm 中收集的 newPassword 是否一致
        if (value !== passwordForm.value.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback() // 就算校验成功，也需要callback
        }
      },
      trigger: 'blur'
    }
  ]
}

// 提交中状态标记
const isSubmitting = ref(false)

// 提交修改密码
const submitPassword = async () => {
  // 预校验
  await form.value.validate()

  await ElMessageBox.confirm(
    `您确认要修改用户 ${props.e5id} 的密码么`,
    '温馨提示',
    {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }
  )

  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用接口
    await adminUpdateUserPasswordService({
      userId: props.e5id,
      newPassword: passwordForm.value.newPassword
    })

    ElMessage.success('密码修改成功')
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}

// 注销用户
const deleteUser = async () => {
  await ElMessageBox.confirm(`您确认要注销用户 ${props.e5id} 吗`, '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  // 设置为提交中状态
  isSubmitting.value = true
  try {
    // 调用接口
    await adminDeleteUserService(props.e5id)
    ElMessage.success('注销成功')
    // // 跳转至首页
    // await router.push('/home')
    // // 退出登录
    // await removeLogin()
    // 重新加载全部数据
    await loadAllData()
  } finally {
    // 无论提交成功或失败，都要解除提交中状态
    isSubmitting.value = false
  }
}
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :with-header="false"
    direction="rtl"
    size="600"
  >
    <div v-loading="isSubmitting">
      <!-- 修改密码表单 -->
      <div>
        <el-text tag="h1" size="large" class="form-title">
          修改用户密码
        </el-text>
        <el-form
          :model="passwordForm"
          :rules="rules"
          ref="form"
          label-width="80px"
          size="large"
          autocomplete="off"
        >
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="passwordForm.newPassword"
              placeholder="请输入新密码"
              @keydown.enter.prevent
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="rePassword">
            <el-input
              v-model="passwordForm.rePassword"
              placeholder="请确认密码"
              @keydown.enter.prevent
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitPassword">保存</el-button>
            <el-button type="info" @click="form.resetFields()">
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-divider />
      <!-- 注销用户 -->
      <div>
        <el-text tag="h1" size="large" class="form-title"> 注销用户 </el-text>
        <el-button type="warning" round @click="deleteUser">
          注销用户
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.form-title {
  margin-bottom: 20px;
}
.copy-button {
  margin-top: 10px;
}
</style>
