import { parseHTML } from 'linkedom';
import { writeFile } from 'node:fs/promises';

async function fetchPage(url) {
	const response = await fetch(url);
	if (response.status === 200) return await response.text();
	throw new Error('Failed to fetch page.');
}

function extractColorNames(document) {
	const colorNamesByHex = {};
	const hexByColorName = {};

	const boxes = document.querySelectorAll('.colorbox');
	boxes.forEach((box) => {
		const name = box.querySelector('.colornamespan').textContent.trim();
		const hexCode = box.querySelector('.colorhexspan > a').textContent.trim();
		if (!colorNamesByHex[hexCode]) {
			colorNamesByHex[hexCode] = [];
		}
		colorNamesByHex[hexCode].push(name);
		hexByColorName[name] = hexCode;
	});

	return { colorNamesByHex, hexByColorName };
}

async function main() {
	const source = 'https://www.w3schools.com/cssref/css_colors.php';
	const { colorNamesByHex, hexByColorName } = extractColorNames(
		parseHTML(await fetchPage(source)).document,
	);
	console.log(
		`Found ${Object.entries(colorNamesByHex).length} different color codes:`,
		colorNamesByHex,
	);
	writeFile('dist/byHex.json', JSON.stringify(colorNamesByHex));
	console.log(
		`Found ${Object.entries(hexByColorName).length} different color names:`,
		hexByColorName,
	);
	writeFile('dist/byName.json', JSON.stringify(hexByColorName));
}

main();
