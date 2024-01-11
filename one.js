const puppeteer = require("puppeteer");
const fs = require("fs");
const ExcelJS = require("exceljs");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000); // 60 seconds

  try {
    await page.goto(url);

    // Wait for paragraphs to be present on the page
    await page.waitForSelector('p');

    // Your scraping logic here
    const allParagraphs = await page.$$eval('p', paragraphs => {
      return paragraphs.map(paragraph => paragraph.textContent.trim());
    });

    // Log the scraped data to console
    console.log("All Paragraphs:", allParagraphs);

    // Save the scraped data to an Excel file
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    
    allParagraphs.forEach((paragraph, index) => {
      worksheet.addRow({ Paragraph: paragraph });
    });

    const excelFilePath = 'scrapeed_data.xlsx';
    await workbook.xlsx.writeFile(excelFilePath);
    console.log(`Data has been exported to ${excelFilePath}`);

  } catch (error) {
    console.error("Error during navigation:", error);
  } finally {
    await browser.close();
  }
}

scrapeProduct("https://en.wikipedia.org/wiki/JavaScript");
