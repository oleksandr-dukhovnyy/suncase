/* eslint-disable */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
const { promisify } = require('util');
/* eslint-enable */

const directory = path.resolve('./dist/img');
const backupEnabled = false;
const calculateSize = true;

let compressedCount = 0;
let totalSizeBefore = 0;
let totalSizeAfter = 0;

const readdir = promisify(fs.readdir);

async function compressImages(dir) {
  try {
    const files = await readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);

      if (fs.statSync(filePath).isDirectory()) {
        await compressImages(filePath);
      } else if (
        ['.jpg', '.jpeg', '.png'].includes(path.extname(filePath).toLowerCase())
      ) {
        const image = sharp(filePath);

        if (calculateSize) {
          const sizeBefore = fs.statSync(filePath).size;
          totalSizeBefore += sizeBefore;
        }

        const compressedFilePath = `${filePath}.compressed${path.extname(
          filePath
        )}`;
        await image.toFile(compressedFilePath, { quality: 100 });

        if (calculateSize) {
          const sizeAfter = fs.statSync(compressedFilePath).size;
          totalSizeAfter += sizeAfter;
        }

        if (backupEnabled) {
          const backupPath = `${filePath}.backup${path.extname(filePath)}`;
          await fsExtra.copy(filePath, backupPath);
        }

        await fsExtra.move(compressedFilePath, filePath, { overwrite: true });
        compressedCount++;
      }
    }
  } catch (error) {
    console.error('Error while compressing images:', error);
  }
}

(async () => {
  await compressImages(directory);
  console.log(
    `Files compressed: ${compressedCount}, optimized: ${(
      (totalSizeBefore - totalSizeAfter) /
      (1024 * 1024)
    ).toFixed(2)}MB`
  );
})();
