const puppeteer = require("puppeteer");
const fs = require("fs");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000); // 60 seconds

  try {
    await page.goto(url);

    // Your scraping logic here

    const allParagraphs = await page.$$eval('p', paragraphs => {
      return paragraphs.map(paragraph => paragraph.textContent.trim());
    });

    // Create a JavaScript object
    const dataObject = { paragraphs: allParagraphs };

    // Save the data to a JSON file
    fs.writeFileSync('scraped_data.json', JSON.stringify(dataObject, null, 2), 'utf-8');
    console.log('Data has been exported to scraped_data.json');

  } catch (error) {
    console.error("Error during navigation:", error);
  } finally {
    await browser.close();
  }
}

scrapeProduct("https://www.basketball-reference.com/leaders/");
