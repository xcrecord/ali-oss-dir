# ali-oss-dir
阿里云oss目录操作封装

```javascript
const OSS = require('ali-oss');
const ossdir = require('ali-oss-dir');

const ossClient = new OSS(...);

ossdir(ossClient).upload('../dir').to('/dir').then((results) => {
    console.log(results);
});
```
