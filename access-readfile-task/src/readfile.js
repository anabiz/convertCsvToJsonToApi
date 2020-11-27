const path = require("path");
const csv = require("csvtojson");
const fs = require('fs');
const fetch = require('node-fetch');
//const readChunk = require('read-chunk');

async function readMyRecord(file) {
    const data = await csv().fromFile(file);

    let batchLength;

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

    let sliceCount = 0;
    let slitCount1 = batchLength;

    let count = (data.length % batchLength == 0) ? data.length / batchLength : Math.floor(data.length / batchLength) + 1;

    //setTimeout(async () => {
    if (--count) {

        // let batchData = data.slice(sliceCount, slitCount1);
        let batchData = data;

        sliceCount += batchLength;
        slitCount1 += batchLength;
        let i = 0;
        let j = 0;

        const url = 'http://localhost:3000/apiv1/report';
        const headers = { "Content-Type": "application/json",}

        const intervalPostRequest = setInterval(async () => {
            try {

                let data = JSON.stringify(batchData[i]);
                console.log(`another post ${i}`);

                let result = await fetch(url, { method: 'POST', headers: headers, body: data })
                console.log(count)
                i++;

            } catch (error) {
               console.log(error.message);
               j++;
            }
            
        }, 5);

        if(i == data.length){
            console.log(`total number of failed requests are ${j}`)
            clearInterval(intervalPostRequest)
        }

        //clearInterval(intervalObj);

        // for (let i = 0; i < batchData.length; i++) {
        //     let data = JSON.stringify(batchData[i]);
        //     console.log(`another post ${i}`)

        // try {
        //     const url = 'http://localhost:3000/apiv1/report';
        //     const headers = {
        //         "Content-Type": "application/json",
        //     }
        //     let result = await fetch(url, { method: 'POST', headers: headers, body: data })
        //     console.log(count)
        // } catch (error) {

        // }

        // }

    }
    //}, 100)



}

readMyRecord('./anualsurvey.csv')

