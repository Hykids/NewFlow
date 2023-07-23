import React from "react";
import { Button, Form, Input, Select, message } from "antd";
import { AddUser } from "@/api/modules/login";

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 }
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
	required: "${label} is required!",
	types: {
		email: "${label} is not a valid email!",
		number: "${label} is not a valid number!"
	},
	number: {
		range: "${label} must be between ${min} and ${max}"
	}
};
/* eslint-enable no-template-curly-in-string */

const onFinish = async (values: any) => {
	try {
		await AddUser(values.user);
		console.log(values, "valuesvalues");
		message.success("添加成功");
	} catch (error) {
		message.error("添加用户失败"); // 处理添加用户失败的情况
	}
};

const userAddForm: React.FC = () => (
	<Form {...layout} name="nest-messages" onFinish={onFinish} style={{ maxWidth: 600 }} validateMessages={validateMessages}>
		<Form.Item name={["user", "username"]} label="Name" rules={[{ required: true }]}>
			<Input />
		</Form.Item>
		<Form.Item name={["user", "password"]} label="Password" rules={[{ required: true }]}>
			<Input />
		</Form.Item>
		<Form.Item name={["user", "role"]} label="Role">
			<Select>
				<Select.Option value="user">User</Select.Option>
				<Select.Option value="admin">Admin</Select.Option>
			</Select>
		</Form.Item>
		<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
			<Button type="primary" htmlType="submit">
				Submit
			</Button>
		</Form.Item>
	</Form>
);

export default userAddForm;
