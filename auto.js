const puppeteer =require('puppeteer');
const fs = require('fs');
var arry=[];
fs.readdir('video',function(err,files){
    if(err){
        console.log(err);
    }
    else{
        (function getfiles(i){
            if(i==files.length){
                return console.log(arry);
            }

            else{
                fs.stat('video/'+files[i],function(error,stats){
                    if(error){
                        console.log(error);
                    }
                    else{
                        if(stats.isFile()){
                            arry.push(files[i]);
                        }
                        getfiles(i+1)
                    }
                })
          
            }
        })(0)
        
    }
})

async function main(){
    let browser=await puppeteer.launch({headless:false,slowMo:400,defaultViewport:{width:1280,height:800}});
    let page=await browser.newPage();

    await page.goto('https://sso.douyin.com/?service=https://www.douyin.com/login/type/media#/');

    await page.waitFor(5*1000);

    for(var i=0;i<arry.length;i++){
    //上传视频元操作

        const upLoad = await page.waitForSelector('input[name="upload-btn"]');
        await upLoad.uploadFile('C:\\puppeteer\\03AutoMatuionPost\\video\\'+arry[i]+'');

        const inputText=await page.waitForSelector('div[role="combobox"]');
        await inputText.click();
        await inputText.type('K12Coder,来了老弟');

        const submitBtn=await page.waitForSelector('button[class="button--1SZwR primary--1AMXd fixed--3rEwh"]');
        await submitBtn.click();

        const IknowBtn=await page.waitForSelector('div[class="button--228g0"]');
        if(IknowBtn){
            await IknowBtn.click();
        }

        await page.waitFor(5*1000);
        const upLoadBtn=await page.waitForSelector('a[href="#/upload"]');
        await  upLoadBtn.click();
    }


}

main();