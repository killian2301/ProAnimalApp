const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.createPendingUser = functions.database
  .ref("/clients/{userId}")
  .onCreate(pendingUserData => {
    const pendingUser = pendingUserData.data.val();
    const userId = pendingUserData.params.userId;
    const trainerId = pendingUser.trainerId;
    const userName = pendingUser.profile.name;

    return admin
      .database()
      .ref(`trainers/${trainerId}`)
      .once("value")
      .then(trainerData => {
        const trainerToken = trainerData.val().token;
        const payload = {
          notification: {
            title: `${userName} just made a request!`,
            body: "Tap here to aprove or reject!",
            sound: "default"
          }
        };
        return admin.messaging().sendToDevice(trainerToken, payload);
      })
      .then(_ => {
        return admin
          .database()
          .ref(`trainers/${trainerId}/clients/pending/${userId}`)
          .set(pendingUser);
      });
  });
