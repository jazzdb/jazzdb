import * as fs from 'fs-extra';
import * as path from 'path';

class DataObject {
    records: any[] = [];
    push(object: any) {
        this.records.push(object);
    }
}

export async function data(data: any): Promise<DataObject> {
    const dir = path.normalize(`./data/${this.table}`);

    const dirExists = fs.existsSync(dir);
    if (!dirExists) {
        await fs.mkdirp(dir);
    }

    return new DataObject();
}