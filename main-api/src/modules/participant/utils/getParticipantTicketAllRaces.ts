import { getStartOfEvent } from "src/utils/date-formater";
import { Participant } from "../entities/participant.entity";

export const getParticipantTicketAllRaces = (participant: Participant) => {
  const participantRaces = participant.registrations.reduce((acc, reg) => {
    return acc + `<p class="value">${reg.eventRaceType?.raceType.name}</p>`;
  }, ``);

  return `
  <!DOCTYPE html>
<html lang="en" xml:lang="en">
  <head>
    <title>Message</title>
    <link rel="stylesheet" type="text/css" href="ticket.css" />
    <style>
      html {
        font-size: 32px;
        background-color: #1E1C1F;
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: Arial, sans-serif;
        margin: 0;
      }
      .container {
        position: relative;
        width: 26.5rem;
        background: url("https://storage.googleapis.com/abe_cloud_storage/website%2Fticket-bg.svg")
          no-repeat center center/cover;
      }
      .image {
        width: 100%;
        height: 10rem;
      }
      .ticket-container {
        padding: 0 1.5rem 1.5rem 1rem;
      }
      .title {
        font-size: 2.5rem;
        line-height: 2.5rem;
        margin-bottom: 0.6rem;
        font-weight: 900;
        color: white;
        text-align: center;
        text-transform: uppercase;
      }

      .subtitle {
        font-size: 0.8rem;
        font-weight: 700;
        color: white;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .footer {
        padding-top: 1.2rem;
        margin-bottom: 0 !important;
        border-top: 0.13rem solid white;
      }

      .desc-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.2rem;
        gap: 1.3rem;
      }

      .name {
        font-size: 0.5rem;
        line-height: 0.7rem;
        opacity: 0.7;
        font-weight: 700;
        margin-bottom: 0.4rem;
        color: white;
        text-transform: uppercase;
      }

      .wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 1.3rem;
      }

      .value {
        font-size: 0.7rem;
        line-height: 0.8rem;
        font-weight: 700;
        color: white;
        text-transform: capitalize;
      }

      .qr {
        width: 8rem;
        height: 8rem;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img
        src="https://storage.googleapis.com/abe_cloud_storage/website%2Fticket-top-red.svg"
        alt="template"
        class="image"
      />
      <div class="ticket-container">
        <h1 class="title">Ace<br />Battle Mile</h1>
        <h4 class="subtitle">
          ${participant.event.title}
        </h4>
        <div class="desc-container">
          <div>
            <p class="name">Name</p>
            <p class="value">${participant.firstName} ${
    participant.lastName
  }</p>
          </div>
          <div>
            <p class="name">Race Type</p>
            ${participantRaces}
          </div>
        </div>
        <div class="desc-container footer">
          <div class="wrapper">
            <div>
              <p class="name">Date</p>
              <p class="value">${getStartOfEvent(
                participant.event.startDateTime,
              )}</p>
            </div>
            <div>
              <p class="name">EVENT PLACE</p>
              <p class="value">${participant.event.location?.address}<br />${
    participant.event.location?.country?.name
  }, ${participant.event.location?.city}</p>
            </div>
          </div>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&margin=0&bgcolor=000000&color=ffffff&data=${
              participant.entranceHash
            }"
            alt="qr"
            class="qr"
          />
        </div>
      </div>
    </div>
  </body>
</html>
  `;
};
