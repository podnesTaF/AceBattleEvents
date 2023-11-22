import puppeteer from 'puppeteer';
import { Event } from 'src/events/entities/event.entity';
import { Media } from 'src/media/entities/media.entity';
import { ViewerRegistration } from 'src/viewer-registrations/entities/viewer-registration.entity';
import {
  googleCloudStorageConfig,
  storage,
} from '../google-cloud-storage.config';

export const getPDFDocument = async (
  event: Event,
  viewer: ViewerRegistration,
  qr: Media,
) => {
  const pdfFileName = `pdfs/${event.title}_${viewer.firstName}_${viewer.lastName}.pdf`;
  const bucket = storage.bucket(googleCloudStorageConfig.bucketName);
  const file = bucket.file(pdfFileName);
  const htmlContent = getHTMLContent(viewer, qr.mediaUrl);
  const pdfFileBuffer = await generatePDFFromHTML(htmlContent, pdfFileName);

  await file.save(pdfFileBuffer);
  await file.makePublic();

  return file.publicUrl();
};

export const generatePDFFromHTML = async (
  htmlContent: string,
  pdfFileName: string,
) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: 'new',
  });
  const page = await browser.newPage();

  // Set the page content to your HTML content
  await page.setContent(htmlContent);

  // Generate the PDF
  const pdf = await page.pdf({
    format: 'A4',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();

  return pdf;
};

// Usage example
export const getHTMLContent = (
  viewer: ViewerRegistration,
  qrCodeUrl: string,
) => {
  const imageEl = `
  <img
  src="${qrCodeUrl}"
  alt="qr"
  width="240"
  height="240"
/>
  `;
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" type="text/css" href="ticket.css" />
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          margin: 0;
        }
        .container {
          position: relative;
          width: 980px;
          height: 1280px;
        }
        .image {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
        .ticket {
          padding-top: 10px;
        }
        .ticket-container {
          background-color: white;
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          border-bottom-left-radius: 20px;
          gap: 16px;
        }
  
        .desc-container {
          width: 200px;
          padding: 20px;
          padding-top: 10px;
        }
  
        .title {
          padding-bottom: 5px;
          border-bottom: 1px solid lightgray;
          color: rgb(157, 157, 157);
        }
  
        .col-gap {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin: 10px 0;
        }
  
        .subname {
          font-size: 16px;
          color: rgb(157, 157, 157);
        }
  
        p,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img
          src="https://storage.googleapis.com/abe_cloud_storage/image/large/97069bbb-1376-4f11-8ee6-56e71ab5a4d9.jpg"
          alt="template"
          class="image"
        />
        <div class="ticket-container">
          <div class="desc-container">
            <h3 class="title">Informations sur les billets</h3>
            <div class="col-gap">
              <h3 class="">
                <span class="subname">Billet:</span><br />
                #${viewer.id}
              </h3>
              <h3 class="">
                <span class="subname">${
                  viewer.gender === 'male'
                    ? 'Monsieur'
                    : viewer.gender === 'female'
                    ? 'Madame'
                    : 'Visiteur'
                }.</span>
                <br />
              ${viewer.firstName} ${viewer.lastName}
              </h3>
              <h3 class="">
                <span class="subname">Type de billet:</span>
                <br />
                VISITEUR
              </h3>
              <h3 class="">
                <span class="subname">Numéro de siège:</span>
                <br />
                TOUT DISPONIBLE
              </h3>
            </div>
          </div>
          <div class="ticket">
            <h3 class="title">Votre billet d'entrée</h3>
           ${imageEl}
          </div>
        </div>
      </div>
    </body>
  </html>
  
`;
};