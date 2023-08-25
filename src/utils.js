import axios from "axios";
import * as cheerio from "cheerio";

const apiKey = "c41a6f74c7msh6d7cb51d9347812p14169bjsn91f668c00fc8";
const apiHost = "chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com";
const apiUrl = "https://chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com/gpt4";

export const getActiveTabURL = async () => {
	const tabs = await chrome.tabs.query({
		currentWindow: true,
		active: true,
	});

	return tabs[0];
};

export const getContent = async url => {
	const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
	const { data } = await axios(corsProxyUrl + url);
	let content = "";

	const $ = cheerio.load(data);
	$("h1, h2, p").each((index, element) => {
		const text = $(element).text();
		content += text;
	});

	return content;
};

export const askGPT = async content => {
	try {
		const { data } = await axios.post(
			apiUrl,
			JSON.stringify({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "user",
						content,
					},
				],
			}),
			{
				headers: {
					"content-type": "application/json",
					"X-RapidAPI-Key": apiKey,
					"X-RapidAPI-Host": apiHost,
				},
			}
		);

		return data.choices[0].message.content;
	} catch (error) {
		return "Unable to fetch data. Try after some time.";
	}
};
