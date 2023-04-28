import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const Nightingale: React.FC = () => {
	const chartRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (chartRef.current) {
			const myChart = echarts.init(chartRef.current);
			const option = {
				legend: {
					top: "bottom"
				},
				toolbox: {
					show: true,
					feature: {
						mark: { show: true },
						dataView: { show: true, readOnly: false },
						restore: { show: true },
						saveAsImage: { show: true }
					}
				},
				series: [
					{
						name: "访问标签量",
						type: "pie",
						radius: [50, 250],
						center: ["50%", "50%"],
						roseType: "area",
						itemStyle: {
							borderRadius: 8
						},
						data: [
							{ value: 40, name: "要闻" },
							{ value: 38, name: "文化" },
							{ value: 32, name: "生态" },
							{ value: 30, name: "科技" },
							{ value: 28, name: "政治" },
							{ value: 26, name: "财经" },
							{ value: 22, name: "国际" },
							{ value: 18, name: "体育" }
						]
					}
				]
			};
			myChart.setOption(option);
		}
	}, []);

	return <div id="main" style={{ width: "100%", height: "500px" }} ref={chartRef}></div>;
};

export default Nightingale;
