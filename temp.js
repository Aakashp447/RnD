const fs = require('fs'); // to read html file
const cheerio = require('cheerio'); // for scrapping
const Jimp = require('jimp'); // to crop and resize generated image
const nodeHtmlToImage = require('node-html-to-image')

const convert = async () => {
  let htmlData = fs.readFileSync('htmlData.html', 'utf8');
  await nodeHtmlToImage({
    output: './image.png',
    html: htmlData,
    content: { customField: 'temp', firstName: 'Aakash', lastName: 'Prajapati', email: 'aakash@logicwind.co', company: 'logicwind' }
  })
  // .then(function (dataUrl) {
  //   download(dataUrl, 'my-node.png');
  // });
}

const cropAndResize = async (imageRoute) => {
  const front = await Jimp.read(imageRoute);
  front.crop(0, 0, 450, 250);
  front.resize(2022, 1275).write('final.png');
}

const convertImage = async () => {
  await convert();
  await cropAndResize('./image.png')
}

convertImage();