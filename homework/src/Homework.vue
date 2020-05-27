<template>
  <div id="homework">
    <el-container>
      <el-header>
        <el-menu
          router
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="route in routes"
            :key="route.index"
            :index="route.path"
          >{{route.displayName}}</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="16" :offset="4">
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Homework",
  data() {
    return {
      routes: this.$router.options.routes.filter(route => route.isHeader),
      activeIndex: this.$router.history.current.path
    };
  },
  methods: {
    handleSelect(key) {
      this.currentTabComponent = key;
    }
  }
};
</script>

<style>
#homework {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-menu-demo {
  padding-left: 50px;
}
</style>