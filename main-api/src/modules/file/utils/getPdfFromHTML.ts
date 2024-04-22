import puppeteer from "puppeteer";

export const generatePDFFromHTML = async (
  htmlContent: string,
): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: "new",
  });
  const page = await browser.newPage();

  // Set the page content to your HTML content
  await page.setContent(htmlContent);

  // Generate the PDF
  const pdf = await page.pdf({
    printBackground: true,
    margin: {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    },
  });

  await browser.close();

  return pdf;
};
