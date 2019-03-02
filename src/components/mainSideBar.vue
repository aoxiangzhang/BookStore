<template>
  <div class="sidebar">
    <el-container>
      <el-header class="p">书籍分类</el-header>
      <el-main>
        <el-menu :default-active="onRoutes" background-color="#eeeeee" class="el-menu-vertical-demo" id="navigator" theme="dark" unique-opened router>
          <template v-for="item in items">
            <template v-if="item.subs">
              <el-submenu :index="item.index">
                <template slot="title">
                  <i :class="item.icon"></i>{{ item.title }}</template>
                <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                </el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="item.index">
                <i :class="item.icon"></i>{{ item.title }}
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          icon: 'el-icon-menu',
          index: '1',
          title: '全部书籍',
        },
        {
          icon: 'el-icon-setting',
          index: '2',
          title: 'J2EE类',
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      // return this.$route.path.replace('/','');
    }
  }
}
</script>

<style scoped>
.p {
  font-size: 26px;
  height: 50px;
  line-height: 50px;
  position: inherit;
  background-color: #dd0606;
  color: #ffffff;
  text-align: center;
}
.sidebar {
  display: block;
  position: absolute;
  width: 15%;
  left: 10%;
  top: 0px;
  bottom: 0;
  background: #efefef;
}
.sidebar > ul {
  height: 100%;
}
</style>
