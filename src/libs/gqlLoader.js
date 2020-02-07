import { readFileSync } from 'fs';
import { sync } from 'glob';

const getGlob = (pattern) => sync(pattern);

const readFile = (fileName) => readFileSync(fileName, 'utf8');

const makeSchema = (fileNames) => fileNames.map(readFile);

const gqlLoader = (pattern) => {
  try {
    const files = getGlob(pattern);
    const schemaFile = makeSchema(files);

    return schemaFile;
  } catch (err) {
    return err;
  }
}

export default gqlLoader;
