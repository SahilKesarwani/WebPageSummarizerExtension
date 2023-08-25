import { getActiveTabURL, getContent, askGPT } from "../utils";

const getSummary = async content => {
	const question = `Provide summary. The content of a website is as follows - ${content}`;
	return await askGPT(question);
};

const getMajorPoints = async content => {
	const question = `Provide major points. The content of a website is as follows - ${content}`;

	return await askGPT(question);
};

const onBtnClick = async getData => {
	const getSummaryBtn = document.getElementById("get-summary");
	const getMajorPointsBtn = document.getElementById("get-major-points");

	const loader = document.getElementById("loader");
	const result = document.getElementById("result");

	getSummaryBtn.disabled = true;
	getMajorPointsBtn.disabled = true;

	result.innerText = "";
	loader.style.display = "block";

	const activeTab = await getActiveTabURL();
	const url = activeTab.url;
	const content = await getContent(url);
	const data = await getData(content);

	loader.style.display = "none";
	result.innerText = data;

	getSummaryBtn.disabled = false;
	getMajorPointsBtn.disabled = false;
};

document.addEventListener("DOMContentLoaded", async () => {
	const getSummaryBtn = document.getElementById("get-summary");
	const getMajorPointsBtn = document.getElementById("get-major-points");

	getSummaryBtn.addEventListener("click", () => {
		onBtnClick(getSummary);
	});

	getMajorPointsBtn.addEventListener("click", () => {
		onBtnClick(getMajorPoints);
	});
});
