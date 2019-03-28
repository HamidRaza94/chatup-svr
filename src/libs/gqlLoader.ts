import { readFileSync } from 'file-system';
import { sync } from 'glob';

function getGlob(pattern: string): string[] {
    return sync(pattern);
}

function readFile(fileName: string): string {
    return readFileSync(fileName, 'utf8');
}

function makeSchema(fileNames: string[]): string[] {
    return fileNames.map(readFile);
}

export default (pattern: string): string[] => {
    try {
        const files: string[] = getGlob(pattern);
        const schemaFile: string[] = makeSchema(files);
        return schemaFile;
    } catch (err) {
        return err;
    }
};
