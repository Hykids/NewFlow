import { Tabs } from "antd";
// import Pie from "./components/pie";
import StackedLine from "./components/stackedLine";
// import Curve from "./components/curve";
import WordCloud from "@/views/echarts/wordCloud";
// import WordCloud from "react-d3-cloud";
import "./index.less";
import { getTagWeight } from "@/api/modules/login";
import { useState, useEffect } from "react";
import BookSum from "./images/book-sum.png";
import AddPerson from "./images/add_person.png";
import AddTeam from "./images/add_team.png";
import Today from "./images/today.png";
import BookSum1 from "./images/book_sum.png";

const { TabPane } = Tabs;
const DataVisualize = () => {
	const [tag, setTag] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const data = await getTagWeight();
			setTag(data);
		}
		fetchData();
	}, []);
	const onChange = (key: string) => {
		console.log(key);
	};

	const tabsList = [{ label: "近七日", name: 1 }];

	return (
		<div className="dataVisualize-box">
			<div className=" card top-box">
				<div className="top-title">数据可视化</div>
				<Tabs defaultActiveKey="1" onChange={onChange}>
					{tabsList.map(item => {
						return <TabPane tab={item.label} key={item.name}></TabPane>;
					})}
				</Tabs>
				<div className="top-content">
					<div className="item-left sle">
						<span className="left-title">访问总数</span>
						<div className="img-box">
							<img src={BookSum} alt="" />
						</div>
						<span className="left-number">84</span>
					</div>
					<div className="item-center">
						<div className="gitee-traffic traffic-box">
							<div className="traffic-img">
								<img src={AddPerson} alt="" />
							</div>
							<span className="item-value">2%</span>
							<span className="traffic-name sle">上涨百分比（周）</span>
						</div>
						<div className="gitHub-traffic traffic-box">
							<div className="traffic-img">
								<img src={AddTeam} alt="" />
							</div>
							<span className="item-value">14</span>
							<span className="traffic-name sle">周访问量</span>
						</div>
						<div className="today-traffic traffic-box">
							<div className="traffic-img">
								<img src={Today} alt="" />
							</div>
							<span className="item-value">2</span>
							<span className="traffic-name sle">今日访问量</span>
						</div>
						<div className="yesterday-traffic traffic-box">
							<div className="traffic-img">
								<img src={BookSum1} alt="" />
							</div>
							<span className="item-value">4</span>
							<span className="traffic-name sle">昨日访问量</span>
						</div>
					</div>
					<div className="item-right">
						<div className="echarts-title">word cloud</div>
						<div className="book-echarts">
							{/* <Pie /> */}
							{tag ? <WordCloud tag={tag} /> : null}
							{/* <WordCloud width={400} height={300} random={() => Math.random()} fontWeight="bold" data={data} /> */}
						</div>
					</div>
				</div>
			</div>
			<div className="card bottom-box">
				{/* <div className="bottom-title">访问量</div> */}
				<div className="bottom-tabs">
					<Tabs defaultActiveKey="1" onChange={onChange}>
						{tabsList.map(item => {
							return <TabPane tab={item.label} key={item.name}></TabPane>;
						})}
					</Tabs>
				</div>
				<StackedLine />
			</div>
		</div>
	);
};

export default DataVisualize;
