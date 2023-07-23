import * as echarts from "echarts";
import { useEffect, useRef } from "react";
type EChartsOption = echarts.EChartsOption;

const option: EChartsOption = {
	title: {
		text: "访问量"
	},
	tooltip: {
		trigger: "axis"
	},
	legend: {
		data: ["时政", "科技", "生态 ", "财经", "文化"]
	},
	grid: {
		left: "3%",
		right: "4%",
		bottom: "3%",
		containLabel: true
	},
	toolbox: {
		feature: {
			saveAsImage: {}
		}
	},
	xAxis: {
		type: "category",
		boundaryGap: false,
		data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
	},
	yAxis: {
		type: "value"
	},
	series: [
		{
			name: "时政",
			type: "line",
			stack: "Total",
			data: [2, 3, 1, 3, 6, 3, 5]
		},
		{
			name: "国际",
			type: "line",
			stack: "Total",
			data: [0, 2, 1, 3, 2, 3, 2]
		},
		{
			name: "生态",
			type: "line",
			stack: "Total",
			data: [1, 2, 2, 1, 0, 3, 1]
		},
		{
			name: "财经",
			type: "line",
			stack: "Total",
			data: [3, 3, 2, 3, 0, 0, 2]
		},
		{
			name: "文化",
			type: "line",
			stack: "Total",
			data: [2, 3, 1, 4, 1, 1, 0]
		}
	]
};

const StackedLine = () => {
	const chartRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const chart = echarts.init(chartRef.current!);
		chart.setOption(option);

		return () => {
			chart.dispose();
		};
	}, [option]);

	return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default StackedLine;
