import fs from 'fs';
import zlib from 'zlib';

class lab03 {

  syncFileRead(filename) {
      var data = fs.readFileSync(filename);
      return data.toString();
  }

  asyncFileRead(filename, callback) {
      fs.readFile(filename, function (err, data) {
          if (err) return console.error(err);
          else {
              return callback(data.toString());
          }
      });
  }

  compressFileStream(inputFile, outputFile) {
      let writeStream = fs.createWriteStream(outputFile);
      fs.createReadStream(inputFile)
          .pipe(zlib.createGzip())
          .pipe(writeStream);
      return writeStream
  }

  decompressFileStream(inputFile, outputFile) {
      let writeStream = fs.createWriteStream(outputFile);
      fs.createReadStream(inputFile)
          .pipe(zlib.createGunzip())
          .pipe(writeStream);
      return writeStream
  }

  listDirectoryContents(dir, callback) {
      fs.readdir(dir, function (err, files) {
          if (err) return console.error(err);
          callback(files);
      });
  }

}

export {lab03};
