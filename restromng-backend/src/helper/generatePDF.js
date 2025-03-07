const puppeteer = require("puppeteer");
const path = require('path');
const fs = require('fs');
const labelhtml = require("./html");

const generatePDF = async (orderData) => {
  try {
    // Create the pdfs directory if it doesn't exist
    const pdfDir = path.resolve(__dirname, "pdfs");
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }
    
    const browser = await puppeteer.launch({
      headless: true, // run in headless mode
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // console.log("Browser launched successfully!");

    // Assuming billData structure is: 
    // { customerName: "...", items: [...], totalAmount: "..." }

    const htmlContent = labelhtml(orderData);


    await page.setContent(htmlContent);
    const pdfFilePath = path.resolve(__dirname, "pdfs", `test.pdf`);
    // console.log("pdfFilePath", pdfFilePath);
    
    // Generate PDF and save it
    await page.pdf({ path: pdfFilePath, format: "A4" });
    // console.log("PDF generated successfully");
    
    await browser.close();
    return pdfFilePath;
  } catch (err) {
    // console.error("Error generating PDF:", err);
    throw err; // Re-throw the error for proper handling upstream
  }
};

module.exports = generatePDF;