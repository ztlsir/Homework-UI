<template>
  <div>
    <h1>作业清单</h1>
    <el-row>
      <el-col :span="1" :offset="22" class="opreate-row">
        <el-button type="primary" @click="create()">创建</el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column fixed prop="id" label="ID" width="150"></el-table-column>
      <el-table-column prop="classes" label="年级" width="120"></el-table-column>
      <el-table-column prop="grade" label="班" width="120"></el-table-column>
      <el-table-column prop="teacherId" label="老师ID" width="120"></el-table-column>
      <el-table-column prop="status" label="状态" width="120"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-size="pageSize"
      :current-page="currentPage"
      layout="prev, pager, next"
      :total="totalData"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<style>
.el-table .success-row {
  background: #c2dffb;
}

.opreate-row {
  margin-bottom: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      tableData: null,
      pageSize: 2,
      totalData: 0,
      currentPage: 1
    };
  },
  methods: {
    create() {
      this.$router.push({ path: "/homework/create" });
    },
    handleClick(row) {
      this.$router.push({ path: "/homework/view", query: { id: row.id } });
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "success-row";
      }
      return "";
    },
    composeTableData(data) {
      return data.map(item => {
        return {
          id: item.id,
          classes: item.classAndGrade.classes,
          grade: item.classAndGrade.grade,
          teacherId: item.teacherId,
          status: item.status,
          createdAt: item.createdAt
        };
      });
    },
    currentChange(newPage) {
      this.currentPage = newPage;
      this.getTableDataFromApi();
    },
    getTableDataFromApi() {
      this.$http
        .get("/homework-api/homeworks", {
          params: {
            pageIndex: this.currentPage,
            pageSize: this.pageSize
          }
        })
        .then(response => {
          this.totalData = response.data.totalNumber;
          this.tableData = this.composeTableData(response.data.resource);
        })
        .catch(function(error) {
          alert("fail:" + JSON.stringify(error));
        });
    }
  },
  mounted() {
    this.getTableDataFromApi();
  }
};
</script>
