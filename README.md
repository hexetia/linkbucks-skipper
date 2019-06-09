Suport all linkbucks domains and subdomains

## Install

### NPM
```bash
npm i saculbr/linkbucks-skipper
```

### YARN 
```bash
yarn add saculbr/linkbucks-skipper
```

## Example
```javascript
const skiper = require('linkbucks-skipper');

/**
* @param {string | null} skipedLink
*/
function callback(skipedLink) {
    console.log(skipedLink); // will output https://google.com OR null if fail
}

skiper("http://www.linkbucks.com/ActW0", )
```
