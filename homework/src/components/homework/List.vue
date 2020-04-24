<template>
  <div>
    <h1>作业清单</h1>
    <el-table :data="tableData" border style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column fixed prop="id" label="ID" width="150"></el-table-column>
      <el-table-column prop="classes" label="年级" width="120"></el-table-column>
      <el-table-column prop="grade" label="班" width="120"></el-table-column>
      <el-table-column prop="teacherId" label="老师ID" width="120"></el-table-column>
      <el-table-column prop="description" label="描述" width="300"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
export default {
  methods: {
    handleClick(row) {
      alert(row.id);
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "success-row";
      }
      return "";
    }
  },

  data() {
    return {
      tableData: [
        {
          id: "test_id",
          classes: 1,
          grade: 1,
          teacherId: "test_teacherId",
          description: "test_description"
        }
      ]
    };
  }
};
</script>
