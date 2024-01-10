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

    // Save the scraped data to a text file
    fs.writeFileSync('scraped_data.txt', allParagraphs.join('\n'), 'utf-8');
    console.log('Data has been exported to scraped_data.txt');

  } catch (error) {
    console.error("Error during navigation:", error);
  } finally {
    await browser.close();
  }
}

scrapeProduct("https://en.wikipedia.org/wiki/JavaScript");
