import express from "express";

const router = express.Router();

const adminMenuList = [
    {title:'首页',key:'Home',icon:'HomeOutlined',path: '/home/index'},
    // {title:'数据大屏',key:'DataScreen',icon:'AreaChartOutlined',path: '/dataScreen/index'},
    {title:'用户管理',key:'UserManage',icon:'TableOutlined',path: '/usertable',children: [
        {
            "icon": "AppstoreOutlined",
            "path": "/user/adduserform",
            "title": "添加用户"
        },
        {
            "icon": "AppstoreOutlined",
            "path": "/user/manageuserform",
            "title": "用户管理"
        }
    ]},
    {title:'文章管理',key:'NewsManage',icon:'FileTextOutlined',path: '/form',children: [
        {
            "icon": "AppstoreOutlined",
            "path": "/form/basicForm",
            "title": "添加文章"
        },
        {
            "icon": "AppstoreOutlined",
            "path": "/form/dynamicForm",
            "title": "文章管理"
        }
    ]},
    {title:'可视化',key:'visualization',icon:'PieChartOutlined',path: '/dashboard',children:[
        {
            "icon": "AppstoreOutlined",
            "path": "/dashboard/dataVisualize",
            "title": "数据可视化"
        },
        {
            "icon": "AppstoreOutlined",
            "path": "/dashboard/userdata",
            "title": "访问记录"
        }
    ]},
]

const userMenuList = [
    {title:'首页',key:'Home',icon:'HomeOutlined',path: '/home/index'},
    {title:'可视化',key:'visualization',icon:'PieChartOutlined',path: '/dashboard',children:[
        {
            "icon": "AppstoreOutlined",
            "path": "/dashboard/userdata",
            "title": "访问记录"
        }
    ]},
]

const getMenuListByRole = (role)=>{
        return role==='admin'?adminMenuList:userMenuList;
    
}

const getMenuList = (req,res,next) => {
    try {
        const {role} = req.query; // 从 URL 参数中获取 role 的值
        // 根据 role 参数获取对应的菜单列表
        const menuList = getMenuListByRole(role);
        if (menuList) {
            res.status(200).json(menuList);
        } else {
            res.status(404).json({ message: "MenuList not exist" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

router.route('/').get(getMenuList);


export default router;