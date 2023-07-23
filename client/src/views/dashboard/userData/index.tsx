import WordCloud from "react-d3-cloud";
// import Nightingale from "./components/nightingale";
import "./index.less";

// import Today from "./images/today.png";
// import BookSum1 from "./images/book_sum.png";
const data = [
	{ text: "新农村", value: 1000 },
	{ text: "多元化就业", value: 200 },
	{ text: "世界读书日", value: 800 },
	{ text: "党的十八大", value: 1000 },
	{ text: "两会", value: 800 },
	{ text: "航天", value: 500 }
];

const UserDataVisualize = () => {
	// const onChange = (key: string) => {
	// 	console.log(key);
	// };

	// 	const tabsList = [
	// 		{ label: "近七日", name: 1 },
	// 		{ label: "近一月", name: 2 },
	// 		{ label: "近三月", name: 3 },
	// 		{ label: "近半年", name: 4 },
	// 		{ label: "近一年", name: 5 }
	// 	];

	return (
		<div className="dataVisualize-box">
			<div className=" card top-box">
				<div className="top-title">访问历史数据可视化</div>
				<div className="top-content">
					{/* <div className="item-left sle">
						<span className="left-title">访问总数</span>
						<Nightingale />
						<span className="left-number">848.132w</span>
					</div> */}
					<div className="item-right">
						<div className="echarts-title">word cloud</div>
						<div className="book-echarts">
							<WordCloud width={300} height={300} random={() => Math.random()} fontWeight="bold" data={data} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserDataVisualize;
