const fs = require('fs'); // to read html file
const cheerio = require('cheerio'); // for scrapping
const { _ } = require('lodash');
const nodeHtmlImage = require('node-html-to-image'); // convert html to png
const Jimp = require('jimp'); // to crop and resize generated image

const convert = async () => {
  let htmlData = fs.readFileSync('fullFront.html', 'utf8');
  let $ = cheerio.load(htmlData);
  console.log($('#firstName').text());
  console.log($('#lastName').text());
  console.log($('#email').text());
  console.log($('#workPhone').text());
  console.log($('#mobilePhone').text());
  console.log($('#title').text());
  console.log($('#customField').text());
  // const ok = $('#customField').text();

  // save image
  await nodeHtmlImage({
    output: './defaultImage.png',
    html: htmlData
  });

  htmlData = _.replace(htmlData, `${$('#firstName').text()}`, '{{ firstName }}');
  htmlData = _.replace(htmlData, `${$('#lastName').text()}`, '{{ lastName }}');
  htmlData = _.replace(htmlData, `${$('#email').text()}`, '{{ email }}');
  // htmlData = _.replace(htmlData, `${$('#workPhone').text()}`, '{{ workPhone }}');
  htmlData = _.replace(htmlData, `${$('#company').text()}`, '{{ company }}');
  // htmlData = _.replace(htmlData, `${$('#customField').text()}`, '{{ customField }}');
  htmlData = _.replace(htmlData, new RegExp(`${$('#customField').text()}`, "g"), '{{ customField }}');
  // htmlData = _.replace(htmlData, `${$('#mobilePhone').text()}`, '{{ mobilePhone }}');
  // htmlData = _.replace(htmlData, `${$('#title').text()}`, '{{ title }}');

  // create hbs
  fs.writeFileSync('htmlData.html', htmlData);
  await nodeHtmlImage({
    output: './output.jpg',
    html: htmlData
  });

  $ = cheerio.load(htmlData);
  console.log($('#firstName').text());
  console.log($('#lastName').text());
  console.log($('#email').text());
  console.log($('#workPhone').text());
  console.log($('#company').text());
  console.log($('#customField').text());
  console.log($('#mobilePhone').text());
  console.log($('#title').text());
}

const cropAndResize = async (imageRoute) => {
  const front = await Jimp.read(imageRoute);
  front.crop(0, 0, 450, 250);
  // sharp('./data.png').resize(1275).toFile('ok.png')
  front.resize(2200, 1275).write('final.png');
}

const convertImage = async () => {
  await convert();
  await cropAndResize('./output.jpg')
}

convertImage();