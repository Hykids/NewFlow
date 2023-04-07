import { Card, Typography } from "antd";
import "./index.less";

const { Paragraph } = Typography;

const CardItem: React.FC = () => (
	<Card className="cardContent">
		<div className="imgcontent">
			<img alt="example" src="https://th.bing.com/th/id/OIP.32oU8_4WLnZ0IN7zxkcfRQHaFj?w=231&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
		</div>
		<Typography className="cardText">
			<Typography.Title editable level={4} style={{ margin: 0 }}>
				h4. Ant Design
			</Typography.Title>
			<Paragraph ellipsis={{ rows: 2 }}>
				In the process of internal desktop applications development, many different design specs and implementations would be
				involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of
				development. In the process of internal desktop applications development, many different design specs and implementations
				would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of
				development. In the process of internal desktop applications development, many different design specs and implementations
				would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of
				development.
			</Paragraph>
			{/* <Descriptions layout="vertical">
				<Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
				<Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
				<Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
			</Descriptions> */}
		</Typography>
	</Card>
);

export default CardItem;
