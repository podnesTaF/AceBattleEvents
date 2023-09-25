import axios from 'axios';
import pdfkit from 'pdfkit';
import { Event } from 'src/events/entities/event.entity';
import { Media } from 'src/media/entities/media.entity';
import { ViewerRegistration } from 'src/viewer-registrations/entities/viewer-registration.entity';
import { bucketBaseUrl } from '../file.service';
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
  const eventDateTime = event.startDateTime.toLocaleDateString();

  const imageUrl = `${bucketBaseUrl}/image/large/c8d8300c-08d6-4110-b9a9-afe2dce5257a.jpg`;

  const imageResponse = await axios.get(imageUrl, {
    responseType: 'arraybuffer',
  });
  const imageBuffer = Buffer.from(imageResponse.data);

  const { data: qrCode } = await axios.get(qr.mediaUrl, {
    responseType: 'arraybuffer',
  });

  const qrBuffer = Buffer.from(qrCode);

  const doc = new pdfkit({
    size: 'A4',
    margin: 0,
  });

  let alignment = 'center';
  let margin = 0;

  // Remove margins for the first image
  doc.image(imageBuffer, {
    width: 600,
    align: 'center',
  });

  doc
    .translate(350, -200)
    .moveTo(100, doc.y)
    .image(qrBuffer, { width: 150 })
    .moveDown(0.25);
  doc.text(`Valid in both print and digital form`).moveDown(0.25);

  // Add spacing
  doc.moveDown(1);

  doc.translate(-350, 50);

  // Add event information
  doc.font('Helvetica-Bold');
  doc.fontSize(14);

  doc.translate(50, 0).text(`Event:`);
  doc.text(`${event.title}`).moveDown(0.25);
  doc.text(`Location:`);
  doc.text(`${event.location.address},`);
  doc
    .text(`${event.location.city}, ${event.location.country.name}`)
    .moveDown(0.25);
  doc.text(`Start Date and Time:`);
  doc.text(`${eventDateTime}`);
  doc.moveDown(0.5);
  // Add separator line
  doc.lineCap('butt').moveTo(0, doc.y).lineTo(500, doc.y).stroke('#333');
  doc.moveDown(0.5);

  doc.fontSize(12);

  // Add viewer information
  doc.font('Helvetica-Bold');
  doc.text(`Viewer Information:`);
  doc.font('Helvetica');
  doc.text(`First Name:`);
  doc.font('Helvetica-Bold');
  doc.text(`${viewer.firstName}`);
  doc.font('Helvetica');
  doc.text(`Last Name:`);
  doc.font('Helvetica-Bold');
  doc.text(`${viewer.lastName}`);
  doc.font('Helvetica');
  doc.text(`Email:`);
  doc.font('Helvetica-Bold');
  doc.text(`${viewer.email}`);
  doc.font('Helvetica');

  // Add separator line
  doc.moveDown(0.5);
  doc.lineCap('butt').moveTo(0, doc.y).lineTo(500, doc.y).stroke('#333');
  doc.moveDown(0.5);

  // Add ticket details
  doc.font('Helvetica-Bold');
  doc.text(`Ticket Details:`);
  doc.font('Helvetica');
  doc.text(`Ticket #${viewer.id}`);
  doc.text(`Ticket Type: VISITOR`);
  doc.text(`Seat Number: ANY AVAILABLE`);
  doc.fillColor('gray');
  doc.moveDown(0.5);

  doc.end();

  const pdfBuffer = await new Promise<Buffer>((resolve) => {
    const buffers: Uint8Array[] = [];
    doc.on('data', (chunk: any) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
  });

  await file.save(pdfBuffer);
  await file.makePublic();

  return file.publicUrl();
};
