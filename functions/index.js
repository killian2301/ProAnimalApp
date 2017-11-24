const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.removePet = functions.database
  .ref("/users/{userId}/petsInAdoption/{petId}")
  .onDelete(petData => {
    const pet = petData.data.previous.val();
    console.log("pet:", pet);

    const userId = petData.params.userId;
    const petId = petData.params.petId;
    const petCategory = pet.profile.category;

    return admin
      .database()
      .ref(`petsInAdoption/${petCategory}/${petId}`)
      .remove();
  });

exports.createPetInAdoption = functions.database
  .ref("/users/{userId}/petsInAdoption/{petId}")
  .onCreate(petData => {
    const pet = petData.data.val();
    console.log(pet);
    const userId = petData.params.userId;
    const petId = petData.params.petId;
    const petCategory = pet.profile.category;

    return admin
      .database()
      .ref(`petsInAdoption/${petCategory}/${petId}`)
      .set(pet);
  });

exports.wantedPet = functions.database
  .ref("/users/{userId}/wantedPets/{petId}")
  .onCreate(wantedPetData => {
    const pet = wantedPetData.data.val();
    console.log(pet);
    const userId = wantedPetData.params.userId;
    const petId = wantedPetData.params.petId;
    const petCategory = pet.profile.category;
    const ownerToken = pet.ownerToken;

    return admin
      .database()
      .ref(`users/${userId}`)
      .once("value")
      .then(userData => {
        const user = userData.val();
        return admin
          .database()
          .ref(`petsInAdoption/${petCategory}/${petId}/wantedBy/${userId}`)
          .set(user)
          .then(_ => {
            const payload = {
              notification: {
                title: `Somebody wants to adopt ${pet.profile.name}!`,
                body: "Tap here to see more",
                sound: "default",
                click_action: "FCM_PLUGIN_ACTIVITY"
              },
              data:{
                petName: pet.profile.name
              }
            };
            return admin
              .messaging()
              .sendToDevice(ownerToken, payload)
              .then(success => {
                console.log("se ha enviado la push a token:", ownerToken);
                console.log(success);
              });
          });
      });
  });

exports.deleteWantedPet = functions.database
  .ref("/users/{userId}/wantedPets/{petId}")
  .onDelete(wantedPetData => {
    const pet = wantedPetData.data.previous.val();
    console.log(pet);
    const userId = wantedPetData.params.userId;
    const petId = wantedPetData.params.petId;
    const petCategory = pet.profile.category;

    return admin
      .database()
      .ref(`petsInAdoption/${petCategory}/${petId}/wantedBy/${userId}`)
      .remove();
  });

exports.deletePetCleanup = functions.database
  .ref("/petsInAdoption/{category}/{petId}/wantedBy")
  .onDelete(wantedByData => {
    const wantedBy = wantedByData.data.previous.val();
    const petId = wantedByData.params.petId;
    console.log(wantedBy);
    console.log(",,,,>",Object.keys(wantedBy));
    var promises = [];
    Object.keys(wantedBy).forEach(key => {
      console.log(key);
      promises.push(
        admin
          .database()
          .ref(`users/${key}/wantedPets/${petId}`)
          .remove()
      );
    });
    return Promise.all(promises);
  });
