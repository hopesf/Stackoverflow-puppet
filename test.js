const puppet = require('puppeteer');
const fs = require('fs');
const wf = require('word-freq');

let questResult;

(async ()=>{

    let url1 = "https://stackoverflow.com/questions?tab=votes&pagesize=50";
    let url2 = "https://stackoverflow.com/questions?tab=votes&page=2";

    const kod1 = "div[class='question-summary']";            // question code


    const browser = await puppet.launch();
    const page = await browser.newPage();

    //Page1

    await page.goto(url1);
    await page.waitForSelector(kod1, {timeout: 0});
    const quest1 = await page.$$eval(kod1, postText => {

        return postText.map(text =>{
           const question =  text.querySelector("div[class='summary'] > h3 >a").textContent;
           const answer  =   text.querySelector("div[class='excerpt']").innerText;

            return question + " "+ answer;

        },{});

    });


    questResult = quest1;

    //Page 2

    await page.goto(url2);

    const quest2 = await page.$$eval(kod1, postText => {

        return postText.map(text =>{
            const question = text.querySelector("div[class='summary'] > h3 >a").textContent;
            const answer  =  text.querySelector("div[class='excerpt']").innerText;

            return question + " "+ answer;

        },{});

    });

    questResult += quest2;
    await fs.writeFileSync('./data.txt', questResult);



    const myArr = questResult.trim().toLowerCase().split(" ");
    let words = wf.freq(myArr);


    await fs.writeFileSync('./data.json', JSON.stringify(words));



    await browser.close();
})();