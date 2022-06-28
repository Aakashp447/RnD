const fs = require('fs'); // to read html file
const cheerio = require('cheerio'); // for scrapping
const Jimp = require('jimp'); // to crop and resize generated image
const puppeteer = require('puppeteer');

const convert = async () => {
  let htmlData = fs.readFileSync('fullFront.html', 'utf8');
  let $ = cheerio.load(htmlData);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlData);
  const content = await page.$("body");
  const imageBuffer = await content.screenshot({ omitBackground: true });
  fs.writeFileSync('puppeteer.png', imageBuffer);
  // .then(function (dataUrl) {
  //   download(dataUrl, 'my-node.png');
  // });
}

const cropAndResize = async (imageRoute) => {
  const front = await Jimp.read(imageRoute);
  front.crop(0, 0, 450, 250);
  front.resize(2200, 1275).write('finalWithPuppeteer.png');
}

convert();
cropAndResize('./puppeteer.png')