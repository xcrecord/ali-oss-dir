const path = require('path');
const expect = require('chai').expect;
const ossdir = require('../index');

const ossClient = {
  putStream(ossPath, stream, options) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(ossPath);
      }, 100);
    });
  }
};

describe('ali-oss-dir', () => {

  it('upload', (done) => {
    ossdir(ossClient).upload(path.join(__dirname, 'fixture/a')).to('/test').then((results) => {
      expect(results.length).to.be.equal(1);
      expect(results[0]).to.be.equal('/test/test1.txt');
      done();
    }).catch(done);
  });

  it('filter', (done) => {
    ossdir(ossClient)
      .upload(path.join(__dirname, 'fixture/a'))
      .filter((filename) => {
        return !/test1\.txt$/.test(filename);
      })
      .to('/test').then((results) => {
        expect(results.length).to.be.equal(0);
        done();
      }).catch(done);
  });


  it('multi dir upload', (done) => {
    ossdir(ossClient)
      .upload(path.join(__dirname, 'fixture/a'))
      .filter((filename) => {
        return !/test1\.txt$/.test(filename);
      })
      .upload(path.join(__dirname, 'fixture/b'))
      .to('/test').then((results) => {
        expect(results.length).to.be.equal(3);
        done();
      }).catch(done);
  });

  it('nested dir upload', (done) => {
    ossdir(ossClient)
      .upload(path.join(__dirname, 'fixture/b'))
      .to('/test').then((results) => {
        expect(results.length).to.be.equal(3);
        done();
      }).catch(done);
  });
});
