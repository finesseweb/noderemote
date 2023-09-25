const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000;
const puppeteer = require('puppeteer');
require("dotenv").config();

  
app.get('/:msg', async(req, res) => {  
     const msg  = req.params.msg;
    
   
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://web.skype.com/?openPstnPage=true');
 
 await page.type('[type="email"]', process.env.ATOM_USERNAME);
  //await page.type('[type="password"]', process.env.ATOM_PASSWORD);
  // click and wait for navigation
  await Promise.all([
    page.click('#idSIButton9'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    
  ]);
  setTimeout( () => {
   page.type('[type="password"]', process.env.ATOM_PASSWORD);

   setTimeout(()=>{
    Promise.all([
      page.click('[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
     
    ]); 
    setTimeout(()=>{Promise.all([
      page.click('#idSIButton9'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
     
    ]);
    setTimeout(()=>{Promise.all([
      page.click('[aria-label="People, groups, messages"]'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
     
    ]);},3000);
    
    
  },2000)
    
   },2000);
   
  }, 2000);

  

 // await page.type('[type="password"]', process.env.process.env.ATOM_PASSWORD);




  })
app.listen(port,()=>console.log(`Listening or port ${port}`));