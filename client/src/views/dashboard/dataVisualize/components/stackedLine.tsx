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
		data: ["时政", "国际", "生态", "财经", "文化"]
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
			data: [120, 132, 101, 134, 90, 230, 210]
		},
		{
			name: "国际",
			type: "line",
			stack: "Total",
			data: [220, 182, 191, 234, 290, 330, 310]
		},
		{
			name: "生态",
			type: "line",
			stack: "Total",
			data: [150, 232, 201, 154, 190, 330, 410]
		},
		{
			name: "财经",
			type: "line",
			stack: "Total",
			data: [320, 332, 301, 334, 390, 330, 320]
		},
		{
			name: "文化",
			type: "line",
			stack: "Total",
			data: [820, 932, 901, 934, 1290, 1330, 1320]
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
