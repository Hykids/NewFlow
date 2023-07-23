import React, { useEffect, useState } from "react";
import { Space, Table, Tag, message } from "antd";
import { getAllUser, deleteUser } from "@/api/modules/login";

interface UserDataType {
	key: string;
	index: number;
	username: string;
	password: string;
	role: string;
}

const fetchData = async (setUsers: (users: UserDataType[]) => void) => {
	const res = await getAllUser();
	res && setUsers(res.map((user, index) => ({ ...user, index: index + 1 })));
};

const UserForm: React.FC = () => {
	const [users, setUsers] = useState<UserDataType[]>([]);

	useEffect(() => {
		fetchData(setUsers);
	}, []);

	const handleDelete = async (id: string) => {
		try {
			await deleteUser(id);
			await fetchData(setUsers);
			message.success("删除用户成功");
		} catch (error) {
			message.error("删除失败");
		}
	};

	const columns: ColumnsType<UserDataType> = [
		{
			title: "Index",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "Name",
			dataIndex: "username",
			key: "username"
		},
		{
			title: "PassWord",
			dataIndex: "password",
			key: "password"
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			render: role => <Tag color={role === "admin" ? "volcano" : "green"}>{role.toUpperCase()}</Tag>
		},
		{
			title: "Action",
			key: "action",
			render: (_, user) => (
				<Space size="middle">
					<a onClick={() => handleDelete(user._id)}>Delete</a>
				</Space>
			)
		}
	];

	return (
		<>
			<Table columns={columns} dataSource={users} />
		</>
	);
};

export default UserForm;
