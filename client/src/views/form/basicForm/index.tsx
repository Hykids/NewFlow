import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, DatePicker, Upload, Select } from "antd";
import { creatArticles } from "@/api/modules/article";
import { Article } from "@/api/interface";

const { TextArea } = Input;

const { Option } = Select;

const BasicForm: React.FC = () => {
	const [form] = Form.useForm();
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const handleTagSelect = (value: string) => {
		setSelectedTags([...selectedTags, value]);
	};

	const handleTagRemove = (value: string) => {
		setSelectedTags(selectedTags.filter(tag => tag !== value));
	};

	const handleSubmit = async (values: any) => {
		const { title, content, tags, createAt } = values;
		const params = {
			title,
			content,
			tags,
			createAt
		} as Article.ArticleItem;
		const res = await creatArticles(params);
		console.log("Form values:", values, res);
	};

	return (
		<Form
			form={form}
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 14 }}
			layout="horizontal"
			style={{ maxWidth: 600 }}
			onFinish={handleSubmit}
		>
			<Form.Item label="title" name="title" rules={[{ required: true, message: "Please input a title" }]}>
				<Input />
			</Form.Item>
			<Form.Item label="DatePicker" name="createAt">
				<DatePicker />
			</Form.Item>
			<Form.Item label="content" name="content" rules={[{ required: true, message: "Please input some content" }]}>
				<TextArea rows={4} />
			</Form.Item>
			<Form.Item label="Upload" valuePropName="fileList">
				<Upload action="/upload.do" listType="picture-card">
					<div>
						<PlusOutlined />
						<div style={{ marginTop: 8 }}>Upload</div>
					</div>
				</Upload>
			</Form.Item>
			<Form.Item label="Tags" name="tags">
				<Select
					mode="tags"
					style={{ width: "100%" }}
					placeholder="Select tags"
					onChange={handleTagSelect}
					onDeselect={handleTagRemove}
					value={selectedTags}
				>
					<Option value="时政">时政</Option>
					<Option value="生活">生活</Option>
					<Option value="要闻">要闻</Option>
				</Select>
			</Form.Item>
			<Form.Item wrapperCol={{ offset: 4 }}>
				<Button type="primary" htmlType="submit" disabled={!(form.getFieldsValue().title && form.getFieldsValue().content)}>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};
export default BasicForm;
