import welcome from "@/assets/images/welcome01.png";
// import { CarouselItem } from "./Carousel";
import { Card, Space } from "antd";
import "./index.less";
import CardItem from "./caedItem";
import { Carousel } from "antd";

const Home = () => {
	return (
		<div className="home card">
			{/* <CarouselItem /> */}
			{/* <img src={welcome} alt="welcome" /> */}
			<div className="leftCard">
				<Carousel>
					<div>
						<img src={welcome} alt="welcome" />
					</div>
				</Carousel>

				<Card>
					<CardItem></CardItem>
				</Card>
				<Card style={{ marginTop: 16 }}>
					<CardItem></CardItem>
				</Card>
			</div>
			<div className="rightCard">
				<Space direction="vertical" size={16}>
					<Card title="墨闻热搜" extra={<a href="#">More</a>} style={{ width: 300 }}>
						<p>Card content</p>
						<p>女子实名举报有人向其父行贿1900万，陕西宝鸡多部门回应</p>
						<p>“这真令人不寒而栗”，ChatGPT编造法学教授性骚扰丑闻</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
					<Card size="small" title="热门标签" extra={<a href="#">More</a>} style={{ width: 300 }}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Space>
			</div>
		</div>
	);
};

export default Home;
