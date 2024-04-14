<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { HomeFilled, Menu, Tools } from '@element-plus/icons-vue'
import { useAdminStore } from '@/stores'
import { loadAllData, removeLogin } from '@/utils/dataManage'
import { avatarConfig, logoImage } from '@/config'
import { isLoading } from '@/router'

// 路由
const router = useRouter()

// 管理信息
const adminStore = useAdminStore()

onMounted(() => {
  // 请求获取数据
  loadAllData()
})
// 退出登录
const logout = async () => {
  // 退出前跳转到首页
  await router.push('/home')

  await removeLogin()

  router.push('/login')
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="65px">
      <el-scrollbar>
        <el-menu :default-active="$route.path" router :collapse="true">
          <div
            class="el-menu__logo"
            :style="{ backgroundImage: `url(${logoImage})` }"
          ></div>
          <el-menu-item index="/home">
            <el-icon>
              <HomeFilled />
            </el-icon>
            <template #title>首页</template>
          </el-menu-item>
          <el-menu-item index="/user-list">
            <el-icon>
              <Menu />
            </el-icon>
            <template #title>用户列表</template>
          </el-menu-item>
          <el-menu-item index="/setting">
            <el-icon>
              <Tools />
            </el-icon>
            <template #title>设置</template>
          </el-menu-item>
          <div class="avatar-container">
            <el-popover :width="256" placement="right">
              <template #reference>
                <el-avatar :src="avatarConfig.defaultAvatar" />
              </template>
              <template #default>
                <!-- 未登录 -->
                <div class="user-info-container">
                  <el-row>
                    <el-avatar
                      :size="60"
                      :src="avatarConfig.defaultAvatar"
                      class="user-avatar"
                    ></el-avatar>
                  </el-row>
                  <el-row>
                    <el-text tag="b"> {{ adminStore.username }} </el-text>
                  </el-row>
                  <el-button @click="logout" type="primary" auto-insert-space>
                    退出登录
                  </el-button>
                </div>
              </template>
            </el-popover>
          </div>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-main
      v-loading="isLoading"
      element-loading-background="rgba(245, 245, 245, 0.8)"
    >
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-menu {
    padding-bottom: 30px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    background-color: #fff;
    // border-right: solid 1px #dcdfe6;
    // border-right: none;
    &__logo {
      height: 120px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 40px auto;
    }

    .avatar-container {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .el-main {
    padding: 0;
  }
}

.user-info-container {
  display: flex;
  flex-direction: column;
  .user-avatar {
    margin-bottom: 8px;
  }
  .el-button {
    margin-top: 10px;
  }
}
</style>
