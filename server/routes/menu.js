import express from "express";

const router = express.Router();

const MenuList = [
    {label:'首页',key:'Home',icon:'HomeOutlined',route: '/'},
    {label:'数据大屏',key:'DataScreen',icon:'AreaChartOutlined',route: '/datasrceen'},
    {label:'用户管理',key:'UserManage',icon:'TableOutlined',route: '/usermanage'},
    {label:'文章管理',key:'NewsManage',icon:'FileTextOutlined',route: '/newsmanage'},
    {label:'可视化',key:'visualization',icon:'PieChartOutlined',route: '/visualization'},
]

const getMenuList = (req,res,next) => {
    try {
   
        if (MenuList) {
            res.status(200).json(MenuList);
        } else {
            res.status(404).json({ message: "MenuList not exist" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

router.route('/').get(getMenuList);


export default router;