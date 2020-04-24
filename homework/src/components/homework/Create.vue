<template>
  <div>
    <h1>创建作业</h1>
    <h3>作文：</h3>
    <el-form :rules="rules" ref="form" :model="form" label-width="80px">
      <el-form-item label="老师" prop="teacherId">
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
          <el-form-item prop="classes">
            <el-input type="text" v-model.number="form.classes" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">年级</el-col>
        <el-col :span="10">
          <el-form-item prop="grade">
            <el-input type="text" v-model.number="form.grade" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">班</el-col>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          action="/file-api/files/upload/image"
          name="multipartFile"
          :multiple="false"
          list-type="picture-card"
          :auto-upload="true"
          :limit="1"
          :file-list="fileList"
          :on-success="uploadOnSuccess"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="uploadHandlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="uploadHandleRemove()"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Create",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [],
      form: {
        classes: 1,
        grade: 1,
        teacherId: "",
        description: "",
        imageId: ""
      },
      rules: {
        teacherId: [
          { required: true, message: "请选择老师" , trigger: "blur"}
        ],
        description: [
          { required: true, message: "请输入描述信息"},
          {
            min: 10,
            max: 9999,
            message: "长度在 10 到 9999 个字符"
          }
        ],
        classes: [
          { required: true, message: "年级不能为空" },
          { type: "number", message: "年级必须为数字值" }
        ],
        grade: [
          { required: true, message: "班号不能为空" },
          { type: "number", message: "班号必须为数字值" }
        ]
      }
    };
  },
  methods: {
    uploadHandleRemove() {
      this.fileList.pop();
      this.resetImageId();
    },
    uploadHandlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadOnSuccess(response) {
      this.form.imageId = response.id;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          return this.$http
            .post("/homework-api/homeworks",this.composeSubmitData())
            .then(function(response) {
              alert("success:"+JSON.stringify(response));
            })
            .catch(function(error) {
              alert("fail:"+JSON.stringify(error));
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    composeSubmitData() {
      var content = {
        description: this.form.description,
        imageId: this.form.imageId
      };
      var submitData = {
        classAndGrade: {
          classes: this.form.classes,
          grade: this.form.grade
        },
        teacherId: this.form.teacherId,
        content: JSON.stringify(content)
      };

      return submitData;
    },
    resetImageId() {
      this.form.imageId = "";
    }
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
