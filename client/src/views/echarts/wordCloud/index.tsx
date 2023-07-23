import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as d3Cloud from "d3-cloud";

function WordCloud(props: any) {
	const { tag } = props;
	console.log(props, "propsprops");
	const wordCloudRef = useRef(null);
	const [layout, setLayout] = useState(null);
	const [wordCloudShow, setwordCloudShow] = useState(false);

	useEffect(() => {
		const data = transformTags(tag);
		console.log(tag, "tag");

		console.log(data, "datadata");
		// const dataS = [
		// 	{ text: "综合", size: 37 },
		// 	{ text: "综合", size: 37 },
		// 	{ text: "文化", size: 48 },
		// 	{ text: "文化", size: 48 },
		// 	{ text: "文化", size: 48 },
		// 	{ text: "经济", size: 16 },
		// 	{ text: "时政", size: 16 }
		// ];
		if (tag.length > 0) {
			const newLayout = d3Cloud()
				.size([500, 400])
				.words(data)
				.padding(5)
				.rotate(() => ~~(Math.random() * 2) * 90)
				.font("Impact")
				.fontSize(d => d.size)
				.on("end", words => drawWordCloud(words, setLayout));
			newLayout.start();
			setLayout(newLayout);
			setwordCloudShow(true);
		} else {
			setLayout(null);
			setwordCloudShow(false);
		}
	}, [tag, wordCloudShow]);

	function drawWordCloud(words, setLayout) {
		console.log(layout);
		if (!layout) {
			return;
		}
		// 清除旧的词云图
		d3.select(wordCloudRef.current).selectAll("*").remove();
		// 绘制新的词云图
		d3.select(wordCloudRef.current)
			.append("svg")
			.attr("width", layout.size()[0])
			.attr("height", layout.size()[1])
			.append("g")
			.attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
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
		// 更新布局
		setLayout(layout);
	}

	const transformTags = tags => {
		const maxWeight = Math.max(...tags.map(tag => tag.weight));
		const minSize = 16;
		const maxSize = 48;

		const transformedTags = tags.map(tag => ({
			text: tag.name,
			size: calculateSize(tag.weight, maxWeight, minSize, maxSize)
		}));

		// Create an array to store the transformed tags with proportional duplication
		const proportionalTags = [];

		transformedTags.forEach(tag => {
			const proportionalCount = Math.round(tag.size / minSize); // Calculate the proportional count based on the minimum size
			for (let i = 0; i < proportionalCount; i++) {
				proportionalTags.push(tag); // Duplicate the tag based on the proportional count
			}
		});

		return proportionalTags;
	};

	// Helper function to calculate the size based on weight and range
	const calculateSize = (weight, maxWeight, minSize, maxSize) => {
		const range = maxSize - minSize;
		const normalizedWeight = (weight / maxWeight) * range;
		return Math.round(normalizedWeight + minSize);
	};

	return <div ref={wordCloudRef}></div>;
}

export default WordCloud;
