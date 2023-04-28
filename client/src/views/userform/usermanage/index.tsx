import React, { useEffect, useState } from "react";
import { Space, Table, Tag, FloatButton } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { getAllUser, deleteUser } from "@/api/modules/login";

interface UserDataType {
	key: string;
	index: number;
	username: string;
	password: string;
	role: string;
}

const UserForm: React.FC = () => {
	const [users, setUsers] = useState<UserDataType[]>([]);

	useEffect(() => {
		async function fetchData() {
			const res = await getAllUser();
			res && setUsers(res.map((user, index) => ({ ...user, index: index + 1 })));
		}
		fetchData();
	}, []);

	const handleDelete = async (id: string) => {
		await deleteUser(id);
		setUsers(users.filter(user => user.key !== id));
	};

	const columns: ColumnsType<DataType> = [
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
					<a onClick={() => handleDelete(user.key)}>Delete</a>
				</Space>
			)
		}
	];

	return (
		<>
			<Table columns={columns} dataSource={users} />
			<FloatButton icon={<QuestionCircleOutlined />} type="primary" style={{ right: 24 }} />
		</>
	);
};

export default UserForm;
