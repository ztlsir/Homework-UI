import VueRouter from 'vue-router'

import Homework_List from "../components/homework/List.vue";
import Homework_Create from "../components/homework/Create.vue";
import Homework_View from "../components/homework/View.vue";
import HomeworkResult_Create from "../components/homeworkResult/Create.vue";

export default new VueRouter({
    routes: [
        { path: "/", redirect: "/homework", isHeader: false },
        { path: "/homework", name: "Homework_List", component: Homework_List, displayName: "作业", isHeader: true },
        { path: "/homework/create", name: "Homework_Create", component: Homework_Create, displayName: "创建作业", isHeader: false },
        { path: "/homework/view", name: "Homework_View", component: Homework_View, displayName: "查看作业", isHeader: false },
        { path: "/homeworkResult", name: "HomeworkResult_Create", component: HomeworkResult_Create, displayName: "作业结果", isHeader: true }
    ]
});