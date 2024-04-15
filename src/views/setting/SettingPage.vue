<script setup>
import 'element-plus/theme-chalk/display.css'
import { ref, nextTick } from 'vue'
import EditAuthCard from './components/EditAuthCard.vue'
import EditAdminCard from './components/EditAdminCard.vue'
import {} from '@/config'
// import { useProfileStore } from '@/stores'

const editAuthCard = ref()
const editAdminCard = ref()

// 设置菜单项的活动状态
const activeMenuItem = ref('1')

// scrollToCard 函数，根据传入卡片的引用进行滚动
const scrollToCard = (cardRef) => {
  nextTick(() => {
    if (cardRef) {
      // 如果卡片引用存在，则执行滚动
      cardRef.$el.scrollIntoView({ behavior: 'smooth' })
    }
  })
}

// 设置菜单项的活动状态
const setActiveMenuItem = (index) => {
  // console.log(index)
  activeMenuItem.value = index
}
</script>

<template>
  <el-container>
    <el-aside>
      <el-scrollbar>
        <el-card class="setting-tab" shadow="hover">
          <template #header>
            <el-text tag="b" size="large" type="primary"> 设置 </el-text>
          </template>
          <el-menu :default-active="activeMenuItem">
            <!-- 根据卡片引用对象中的键值来触发滚动 -->
            <el-menu-item index="1" @click="scrollToCard(editAuthCard)">
              <el-text tag="b" size="large"> 修改管理员登录信息 </el-text>
            </el-menu-item>
            <el-menu-item index="2" @click="scrollToCard(editAdminCard)">
              <el-text tag="b" size="large"> 修改管理信息 </el-text>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-scrollbar>
    </el-aside>
    <el-main class="setting-main">
      <el-row>
        <el-col class="setting-col">
          <el-scrollbar>
            <!-- 修改管理员登录信息 -->
            <EditAuthCard
              ref="editAuthCard"
              class="setting-card"
              @mouseenter="setActiveMenuItem('1')"
            ></EditAuthCard>

            <!-- 修改管理信息 -->
            <EditAdminCard
              ref="editAdminCard"
              class="setting-card"
              @mouseenter="setActiveMenuItem('2')"
            ></EditAdminCard>
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.setting-tab {
  margin: 0 5px 10px 20px;
  border-radius: 0 0 20px 20px;
  border-top-width: 0;
  :deep() {
    .el-card__body {
      padding: 0;
    }
  }
  .el-menu {
    border-right: none;
    :deep() {
      .is-active {
        background-color: #d9ecff;
      }
    }
  }
}

.links-card {
  margin: 10px 5px 10px 20px;
  border-radius: 20px;
}

.setting-main {
  padding: 0 15px 0 0;
  .setting-col {
    height: 100vh;
    .setting-card {
      margin: 10px 5px;
      border-radius: 20px;
    }
  }
  .user-col {
    height: 100vh;
    .user-card {
      margin: 10px 5px 20px 5px;
    }
  }
}
</style>
