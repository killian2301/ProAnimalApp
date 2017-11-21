const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
// .onWrite(event => {
//   // Grab the current value of what was written to the Realtime Database.
//   const original = event.data.val();
//   console.log('Uppercasing', event.params.pushId, original);
//   const uppercase = original.toUpperCase();
//   // You must return a Promise when performing asynchronous tasks inside a Functions such as
//   // writing to the Firebase Realtime Database.
//   // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//   return event.data.ref.parent.child('uppercase').set(uppercase);
// });

exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  admin.database().ref('/messages').push({original: original}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});

// exports.createUser = functions.database.ref('/animalsInAdoption/cats')
// .onWrite(catsData => {
//   // Grab the current value of what was written to the Realtime Database.
//   return console.log(catsData.data.val());

//   // const cat = event.val();
//   // const catKey = cat.val().key;
//   // const ownerKey = cat.val().ownerKey;
//   // return admin.database.ref('users').set(ownerKey).then(_ => {
//   //   return admin.database.ref('users/petsInAdoption').set(catKey).then(_ => {
//   //     return admin.database.ref(`users/petsInAdoption/${catKey}`).set(cat.val());
//   //   }
//   //   )
//   // });
// });
