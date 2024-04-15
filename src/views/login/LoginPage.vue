<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { adminLoginService } from '@/api/admin.js'
import { useAuthStore } from '@/stores'
import { loginImage } from '@/config'
import { userRules } from '@/config/rules'

// 表单组件
const form = ref()

// 整个的用于提交的form数据对象
const formModel = ref({
  username: '',
  email: '',
  password: '',
  repassword: ''
})

const rules = userRules

const authStore = useAuthStore()
const router = useRouter()

// 登录
const isLogingIn = ref(false) // 标记状态
const login = async () => {
  isLogingIn.value = true
  try {
    await form.value.validate()
    const res = await adminLoginService(formModel.value)
    // 保存token
    authStore.setToken(res.data.token)
    // 跳转至首页
    await router.push('/home')
    ElMessage.success('登录成功')
  } finally {
    // 无论成功或失败，都要解除状态
    isLogingIn.value = false
  }
}
</script>

<template>
  <el-row class="login-page">
    <el-col
      :span="12"
      class="bg"
      :style="{ backgroundImage: `url(${loginImage})` }"
    ></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
      >
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            :loading="isLogingIn"
            class="button --el-color-primary-light-3"
            type="primary"
            auto-insert-space
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;

  // background-color: #fff;
  .bg {
    // background: url('@/assets/login_bg.jpg') no-repeat center / cover;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    border-radius: 0 30px 30px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
