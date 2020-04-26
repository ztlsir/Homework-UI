import VueRouter from 'vue-router'

import Homework_List from "../components/homework/List.vue";
import Homework_Create from "../components/homework/Create.vue";
import HomeworkResult_Create from "../components/homeworkResult/Create.vue";

export default new VueRouter({
    routes: [
        { index: 1, path: "/", redirect: "/homework", isHeader: false },
        { index: 1, path: "/homework", name: "Homework_List", component: Homework_List, displayName: "作业", isHeader: true },
        { index: 2, path: "/homework/create", name: "Homework_Create", component: Homework_Create, displayName: "创建作业", isHeader: false },
        { index: 3, path: "/homeworkResult", name: "HomeworkResult_Create", component: HomeworkResult_Create, displayName: "作业结果", isHeader: true }
    ]
});