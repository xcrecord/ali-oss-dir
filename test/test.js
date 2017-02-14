const path = require('path');
const expect = require('chai').expect;
const ossdir = require('../index');

const ossClient = {
  putStream(ossPath, stream, options) {
    return Promise.resolve(ossPath);
  }
};

describe('ali-oss-dir', () => {

  it('upload', () => {
    ossdir(ossClient).upload(path.join(__dirname, 'fixture/a')).to('/test').then((results) => {
      expect(results.length).to.be.equal(1);
      expect(results[0]).to.be.equal('/test/test1.txt');
    });
  });

  it('filter', () => {
    ossdir(ossClient)
      .upload(path.join(__dirname, 'fixture/a'))
      .filter((filename) => {
        return !/test1\.txt$/.test(filename);
      })
      .to('/test').then((results) => {
        expect(results.length).to.be.equal(0);
      });
  });


  it('multi dir upload', () => {
    ossdir(ossClient)
      .upload(path.join(__dirname, 'fixture/a'))
      .filter((filename) => {
        return !/test1\.txt$/.test(filename);
      })
      .upload(path.join(__dirname, 'fixture/b'))
      .to('/test').then((results) => {
        expect(results.length).to.be.equal(2);
      });
  });
});
