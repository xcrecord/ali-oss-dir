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
      .filter((file) => {
        return !/test1\.txt$/.test(file.path);
      })
      .to('/test').then((results) => {
        expect(results.length).to.be.equal(0);
        done();
      }).catch(done);
  });


  it('multi dir upload', (done) => {
    ossdir(ossClient)
      .upload(path.join(__dirname, 'fixture/a'))
      .filter((file) => {
        return !/test1\.txt$/.test(file.path);
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

  it('sort', async () => {
    const ossDir = ossdir(ossClient)
      .upload(path.join(__dirname, 'fixture/b'))
      .sort((fileA, fileB) => {
        if (/test3/.test(fileA)) {
          return -1;
        }
        return 0;
      });

    expect(/test3/.test(ossDir.files[ossDir.files.length -1]));
  })
});
