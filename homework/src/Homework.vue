<template>
  <div id="homework">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="homework_List">作业</el-menu-item>
          <el-menu-item index="homeworkResult_Create">作业结果</el-menu-item>
          <el-menu-item index="成绩">成绩</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="16" :offset="4">
            <component v-bind:is="currentTabComponent"></component>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import homework_List from "./components/homework/List.vue";
import homeworkResult_Create from "./components/homeworkResult/Create.vue";

export default {
  name: "Homework",
  components: {
    homework_List,
    homeworkResult_Create
  },
  data() {
    return {
      activeIndex: "homework_List",
      currentTabComponent: "homework_List"
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