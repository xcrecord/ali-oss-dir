# ali-oss-dir
阿里云oss目录操作封装

```javascript
const oss = require('ali-oss');
const ossdir = require('ali-oss-dir');

ossdir.upload('../dir').to('/dir').then((results) => {
    console.log(results);
});
```
