import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as d3Cloud from "d3-cloud";

function WordCloud() {
	const wordCloudRef = useRef(null);
	const [layout, setLayout] = useState(null);

	useEffect(() => {
		const data = [
			{ text: "apple", size: 32 },
			{ text: "orange", size: 24 },
			{ text: "banana", size: 16 },
			{ text: "watermelon", size: 8 },
			{ text: "grape", size: 4 }
		];
		console.log(layout);

		const newLayout = d3Cloud()
			.size([800, 600])
			.words(data)
			.padding(5)
			.rotate(() => ~~(Math.random() * 2) * 90)
			.font("Impact")
			.fontSize(d => d.size)
			.on("end", drawWordCloud); // 将 drawWordCloud 函数作为回调函数传递给 on("end")

		newLayout.start(); // 计算词云布局

		function drawWordCloud(words) {
			setLayout(newLayout); // 设置 layout
			d3.select(wordCloudRef.current)
				.append("svg")
				.attr("width", newLayout.size()[0])
				.attr("height", newLayout.size()[1])
				.append("g")
				.attr("transform", "translate(" + newLayout.size()[0] / 2 + "," + newLayout.size()[1] / 2 + ")")
				.selectAll("text")
				.data(words)
				.enter()
				.append("text")
				.style("font-size", d => d.size + "px")
				.style("font-family", "Impact")
				.style("fill", (d, i) => d3.schemeCategory10[i % 10])
				.attr("text-anchor", "middle")
				.attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
				.text(d => d.text);
		}
	}, []);
	return <div ref={wordCloudRef}></div>;
}

export default WordCloud;
