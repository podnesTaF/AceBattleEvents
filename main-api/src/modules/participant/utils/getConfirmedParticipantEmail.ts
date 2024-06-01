import { formatDate } from "src/utils/date-formater";
import { Participant } from "../entities/participant.entity";

export const getConfirmedParticipantEmail = ({
  participant,
}: {
  participant: Participant;
}) => {
  return `
  <!DOCTYPE html>
<html lang="en" xml:lang="en">
  <head>
    <title>Message</title>
    <style>
      /* Your CSS styles here */
      body {
        font-family: "Poppins", sans-serif;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 700px;
        margin: 0px auto;
        background-color: #fff;
      }
      .title-container {
        padding: 10px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .main-container {
        padding: 16px;
      }

      a {
        color: #ff1744 !important;
        font-weight: 700;
        text-decoration: none;
      }

      .title-text {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      .footer {
        margin-top: 30px;
        padding-top: 30px;
        border-top: 2px solid lightgray;
      }
      .copy-text {
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 10px;
        color: gray;
      }
      .mb-4 {
        margin-bottom: 16px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="title-container">
        <img
          src="https://storage.googleapis.com/abe_cloud_storage/logo%2Fabm-logo-black.png"
          alt="ace battle mile"
          width="150px"
        />
      </div>
      <div class="main-container">
        <div class="title-text">Thank you, ${participant.firstName} ${
    participant.lastName
  } for taking part in the upcoming event.</div>
        <div class="mb-4">
          Your email has been successfully verified, and you're all set for the Ace Battle Mile.
        </div>
        <div>
          <p>
            <b>Event Details:</b>
            <ul> 
              <li>Event: ${participant.event.title}</li>
              <li>Date & Time: ${formatDate(
                participant.event.startDateTime,
              )}</li>
              <li>Race(s): ${participant.registrations.reduce(
                (acc, curr) =>
                  (acc ? ", " + acc : acc) +
                  curr.eventRaceType.raceType.name +
                  ", ",
                "",
              )}</li>
              </li>Bib Number: ${participant.bibNumber}</li>
            </ul>
          </p>
          <p>
            Attached to this email, you will find your ticket for the event. Please print it out and bring it with you on the day of the race, or save it on your mobile device for digital check-in.
          </p>
          <p>
            <b>
              Getting Ready for Race Day
            </b>
            <ul>
              <li>
                Arrive early to allow ample time for check-in.
              </li>
              <li>
                Bring a valid ID along with your ticket for verification.
              </li>
              <li>
                Check the weather forecast in advance and dress appropriately.
              </li>
            </ul>
          </p>
          <p>
           If you encounter any issues or have questions, feel free to contact us at
            <a href="mailto:info@aba.run">info@aba.run</a>.
          </p>
          <p>We're looking forward to an exciting race and can't wait to see you at the starting line!</p>
        </div>
        <div class="footer">
          <img
            class="mb-4"
            src="https://storage.googleapis.com/abe_cloud_storage/logo%2Fabm-logo-long-black.png"
            alt="ABM"
            height="30"
          />
          <div class="copy-text">
            &copy; 2023 Ace Battle Mile. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;
};
