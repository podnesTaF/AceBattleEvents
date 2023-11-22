import { Club } from 'src/club/entities/club.entity';
import { Manager } from 'src/users/entities/manager.entity';
import { Runner } from 'src/users/entities/runner.entity';
import { formatDate } from 'src/utils/date-formater';

export const acceptJoinRequestTemplate = (club: Club, manager: Manager) => {
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
            margin: 0;
            padding: 0;
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
            margin-bottom: 10px;
          }
          .btn-wrapper {
            background-color: #42e334;
            max-width: 200px;
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
            margin-bottom: 10px;
          }
          .btn {
            color: white;
            font-weight: 600;
            text-decoration: none;
            font-size: 20px;
          }
          .wrapper {
            margin: 20px;
          }
    
          .btn-wrapper.green {
            background-color: #42e334;
            color: white !important;
          }
    
          .btn-wrapper.yellow {
            background-color: #fcef3c;
            color: black !important;
          }
          .btn-wrapper.yellow .btn {
            color: black !important;
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
              Contgratulations. You were accepted to be a member of ${club.name}!
            </h3>
          </div>
          <div class="wrapper">
            <h4>We are glad to say, that you are now the part of ${club.name}.</h4>
            <p>
              You can contact your club manager to ask what do next. Here is his
              email:
            </p>
            <h4 class="center">${manager.user.email}</h4>
          </div>
          <div class="wrapper">
            <div class="btn-wrapper green">
              <a
                class="btn"
                href="https://acebattlemile.org/clubs/${club.id}"
                target="_blank"
              >
                visit club page
              </a>
            </div>
            <div class="btn-wrapper yellow">
              <a
                class="btn"
                href="https://acebattlemile.org/profile/${manager.user.id}"
                target="_blank"
              >
                manager page
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
};

export const joinRequestTemplate = (
  club: Club,
  runner: Runner,
  motivation: string,
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
        margin: 0;
        padding: 0;
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
        margin-bottom: 10px;
      }
      .text {
        margin: 0;
      }
      .left {
        margin: 10px 20px;
      }
      .btn {
        background-color: #42e334;
        border: none;
        text-decoration: none;
        border-radius: 5px;
        padding: 5px 10px;
        color: white !important;
        font-weight: 600;
        font-size: 20px;
      }
      .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
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
          ${runner.user.name} ${runner.user.surname}<br />
          wants to join your club!
        </h3>
      </div>
      <h4 class="center">User information</h4>
      <div class="info-container">
        <div class="container">
          <p>email:</p>
          <h4>${runner.user.email}</h4>
        </div>
        <div class="container">
          <p class="text">Date of Brirth</p>
          <h4>${formatDate(runner.dateOfBirth) || '-'}</h4>
        </div>
        <div class="container">
          <p class="text">Profile:</p>
          <h4>
            <a href="https://acebattlemile.org/profile/${
              runner.user.id
            }" target="_blank"
              >user profile</a
            >
          </h4>
        </div>
      </div>
      <div class="title-container">
        <h4>Motivation:</h4>
      </div>
      <p class="left">
        ${motivation}
      </p>
      <div class="wrapper">
        <a
          class="btn"
          href="https://acebattlemile.org/clubs/${club.id}/join-requests"
          target="_blank"
        >
          Manage join requests
        </a>
      </div>
    </div>
  </body>
</html>
`;
};