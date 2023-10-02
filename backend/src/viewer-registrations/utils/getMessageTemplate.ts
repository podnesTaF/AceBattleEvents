import { Event } from 'src/events/entities/event.entity';
import { formatDate } from 'src/utils/date-formater';
import { ViewerRegistration } from '../entities/viewer-registration.entity';
import { getGoogleMapsLink } from '../viewer-registrations.service';

export const successRegisterTemplate = (
  event: Event,
  registration: ViewerRegistration,
) => {
  return `
    <!DOCTYPE html>
      <html>
        <head>
          <style>
            /* Your CSS styles here */
            body {
              font-family: 'Poppins', sans-serif;
              background-color: #f0f0f0;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            .intro-image {
              width: 100%;
              height: auto;
              object-fit: cover;
            }
            h3 {
              margin: 0;
              padding: 0;
            }
            .title-container {
              padding: 10px;
              background-color: #ff0000;
              font-size: 20px;
              font-weight: 600;
              color: white;
              margin-bottom: 20px;
            }
            h4 {
              font-weight: 600;
              font-size: 18px;
            }
            a {
              color: black;
            }
            .right {
              text-align: right;
              margin-right: 10px;
            }
            .info-container {
              padding: 10px;
              border-radius: 10px;
              background-color: #f7f7f7;
              max-width: 480px;
              margin: 20px auto;
            }
            .container {
              margin-bottom: 10px;
            }
            .center {
              text-align: center;
              margin-bottom:10px;
            }
            .text {
              margin-bottom: 0;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <img
              class="intro-image"
              src="https://storage.googleapis.com/abe_cloud_storage/image/large/c8d8300c-08d6-4110-b9a9-afe2dce5257a.jpg"
              alt="image"
            />
            <div class="title-container">
              <h3>
                You are successfuly registered to attend <br />
                ${event.title} event in ${event.location.city}
              </h3>
            </div>
            <h4 class="right">Thank you for registration!</h4>
            <div class="info-container">
              <div class="container">
                  <p>Address:</p>
                  <h4><a href="${getGoogleMapsLink(event.location)}">${
    event?.location.address
  },${event?.location.zipCode}</a></h4>
              </div>
              <div class="container">
                  <p class='text'>Start Date and Time:</p>
                  <h4>${formatDate(event.startDateTime)}</h4>
              </div>
              <div class="container">
                  <p class='text'>Ticket number:</p>
                  <h4>#${registration.id}</h4>
              </div>
              <div class="container">
                  <p class='text'>Ticket Type:</p>
                  <h4>General access</h4>
              </div>
            </div>
            <p class='center'>Have fun together with your friends! <br>
                  Share this link!</p>
              <div class="info-container">
                  <p class='center text'>https://acebattlemile.org/join-us</p>
              </div>
              <p class="right">Attached you will find your ticket.</p> 
          </div>
        </body>
      </html>
      `;
};
