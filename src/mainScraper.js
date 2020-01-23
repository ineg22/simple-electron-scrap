const https = require('https');
const path = require('path');
const fs = require('fs');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

module.exports = function mainScraper() {
  const URL = document.querySelector('#url').value;
  const selector = document.querySelector('#selector').value;
  const attribute = document.querySelector('#attribute').value || 'outerHTML';

  const date = new Date();
  const datePath = `${date
    .toLocaleDateString()
    .split('/')
    .join('-')}-${date
    .toLocaleTimeString()
    .split(' ')[0]
    .split(':')
    .join('-')}`;
  let data = '';

  fs.mkdir(path.join('./', 'output', datePath), e => {
    if (e) console.error(`problem with mkdir: ${e}`);
  });

  const outputFilePath = path.join('./', 'output', datePath, 'result.txt');

  const req = https.request(URL, response => {
    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () => {
      const dom = new JSDOM(data);
      const result = [];

      dom.window.document.querySelectorAll(selector).forEach(el => {
        console.log(el[attribute]);
        result.push(el[attribute]);
      });

      fs.writeFile(outputFilePath, result.join('\n'), e => {
        if (e) console.error(`problem with writeFile: ${e.message}`);
      });
    });
  });

  req.on('error', e => {
    console.error(`problem with request: ${e.message}`);
  });

  req.end();
};
