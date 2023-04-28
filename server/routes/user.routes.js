import express from "express";
import { createUsers,getAllUsers,getUsersInfoByID,deleteUsers,toggleUserRole } from "../controllers/user_controller.js";

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/').post(createUsers);
router.route('/:id').get(getUsersInfoByID);
router.route('/:id').delete(deleteUsers);
router.route('/:id/role').patch(toggleUserRole);

export default router;
