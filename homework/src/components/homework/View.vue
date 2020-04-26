<template>
  <div>
    <h1>查看作业</h1>
    <h3>作文：</h3>
    <el-form :ref="form" :model="form" label-width="80px" :disabled="true">
      <el-form-item label="老师">
        <el-select v-model="form.teacherId" placeholder="请选择老师">
          <el-option label="李老师" value="000001"></el-option>
          <el-option label="刘老师" value="000002"></el-option>
          <el-option label="张老师" value="000003"></el-option>
          <el-option label="王老师" value="000004"></el-option>
          <el-option label="姚老师" value="000005"></el-option>
          <el-option label="曹老师" value="000006"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" required>
        <el-col :span="10">
          <el-form-item>
            <el-input type="text" v-model.number="form.classes" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">年级</el-col>
        <el-col :span="10">
          <el-form-item>
            <el-input type="text" v-model.number="form.grade" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">班</el-col>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-image v-if="Object.keys(form.imagePath).length!==0" :src="form.imagePath"></el-image>
        <span v-else>无</span>
      </el-form-item>
      <el-form-item label="状态">
        <span>{{form.status}}</span>
      </el-form-item>
      <el-form-item label="创建时间">
        <span>{{form.createdAt}}</span>
      </el-form-item>
    </el-form>
    <el-button @click="back()">返回</el-button>
  </div>
</template>

<script>
export default {
  name: "Create",
  data() {
    return {
      form: {
        id: "",
        classes: "",
        grade: "",
        teacherId: "",
        status: "",
        createdAt: "",
        description: "",
        imagePath: ""
      }
    };
  },
  methods: {
    getHomeworkFromApi() {
      this.$http
        .get("/homework-api/homeworks/" + this.$route.query.id)
        .then(response => {
          this.form = this.composeFormData(response.data);
        })
        .catch(function(error) {
          alert("fail:" + JSON.stringify(error));
        });
    },
    back() {
      this.redirectToHomework();
    },
    redirectToHomework() {
      this.$router.push({ path: "/homework" });
    },
    composeFormData(data) {
      var content = null;
      try {
        content = JSON.parse(data.content);
      } catch (error) {
        content = { description: "", imageId: "" };
      }

      return {
        id: data.id,
        classes: data.classAndGrade.classes,
        grade: data.classAndGrade.grade,
        teacherId: data.teacherId,
        status: data.status,
        createdAt: data.createdAt,
        description: content.description,
        imagePath:
          content.imageId === ""
            ? ""
            : "/file-api/files/image/" + content.imageId
      };
    }
  },
  mounted() {
    this.getHomeworkFromApi();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
