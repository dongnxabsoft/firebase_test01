var admin = require("firebase-admin");
var serviceAccount = require("../common/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const QueueRes = (input) => {
    setInterval(()=>{
        try {
            if(input.data[0]){
              const message = {
                  token: input.data[0],
                  // token:docf.data().tokens[2],
                  data: {
                      type: 'warning',
                      content: 'A new weather warning has been created!',
                  },
                  notification: {
                      title: 'Basic Notification',
                      body: 'This is a basic notification sent from the server!',
                      imageUrl: 'https://my-cdn.com/app-logo.png',
                  },
                  // topic:'VietNam'
                  // condition:"'VietNam' in topics|| 'HaiPhong' in topics"
              };
              admin.messaging().send(message).then(response => {
                  console.log('Successfully sent message:', response);
                  input.shift();
                  input.count--;
              })
            }       
  } catch (err) {
      console.log(err)
  }
    },1000)
}
module.exports=QueueRes