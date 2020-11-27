const path = require("path");
const csv = require("csvtojson");
const fs = require('fs');


class Read {

    constructor(filePath) {
        this.filePath = filePath;
    }

    set fileName(name) {
        this.filePath = name;
    }

    get inputFileName() {
        return this.filePath;
    }

    async readFile() {
        const data = await csv().fromFile(this.filePath);
        return data;
    }

    async batchLength() {

        let batchLength;
        const data = await this.readFile();
        
        switch (true) {
            case data.length < 500:
                batchLength = 100;
                break;

            case (data.length < 5000 && data.length > 1000):
                batchLength = 500;
                break;

            case data.length > 5000:
                batchLength = 1000;
                break;
        }
        
        return batchLength;
    }

}


class PrintOut extends Read {
    constructor(filePath, endpoint) {
        super(filePath);
        this.endpoint = endpoint;
    }

    async chunk() {
        let data = await this.readFile()
        let sliceCount = 0;
        let batchLength = await this.batchLength()
        let slitCount1 = batchLength;
        let count = (data.length % batchLength == 0) ? data.length / batchLength : Math.floor(data.length / batchLength) + 1;

        while (count !== 0) {
            let batchData = data.slice(sliceCount, slitCount1);
            sliceCount += batchLength;
            slitCount1 += batchLength;
            this.writeData(batchData, sliceCount)
            count--;
        }
    }

    async writeData(data, fileName) {
        if (!fs.existsSync(path.join(__dirname, `../${this.endpoint}`))) {
            fs.mkdirSync(path.join(__dirname, `../${this.endpoint}`));
        }
        let outputPath = path.join(__dirname, `../${this.endpoint}/${fileName}.json`);
        const stingData = JSON.stringify(data, null, 2);
        fs.writeFileSync(outputPath, stingData);
    }
}


const objRead = new PrintOut('./DimenLookupArea.csv', "output4")
objRead.chunk();

console.log(objRead.inputFileName)
objRead.fileName = './anualsurvey.csv'
console.log(objRead.inputFileName)
// objRead.batchLength().then((lengt) => {
//     console.log(lengt);
// });