export const getVerificationLetterTemplate = ({
  name,
  token,
  eventCode,
}: {
  name: string;
  token: string;
  eventCode?: string;
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
        .main-text {
          font-size: 18px;
          font-weight: 400;
          margin-bottom: 16px;
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
          <div class="title-text">Hi, ${name}</div>
          <div class="mb-4">
            Welcome to the Ace Battle Mile! We're excited to have you join us.
          </div>
          <div>
            <p>
              Your registration for ${eventCode} has been successfully received.
              You're just one step away from securing your place in the race.
            </p>
            <p>
              <b>Please verify your email address by clicking the link below</b>.
              Once confirmed, you will receive copy of your race ticket and all
              necessary event details.
            </p>
            <p>
              <a href="https://aba.run/events/${eventCode}/confirm/${token}"
                >Verify Email & Receive Your Ticket</a
              >
            </p>
            <p>
              Note: This link will expire in <b>24 hours</b>. If you encounter any
              issues or have questions, feel free to contact us at
              <a href="mailto:info@aba.run">info@aba.run</a>.
            </p>
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
