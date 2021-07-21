const express = require("express");
const cors = require("cors");
const http = require("http")
const https = require("https")
const fs = require('fs');
const bodyParser = require("body-parser");

const Queue = require('./Model/Queue');
const QueueRes = require('./Control/QueueRes')

const app = express();
const ARR = new Queue();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const server = http.createServer(app)
const https_sv = https.createServer(app, {
  key: fs.readFileSync(__dirname + "/key.pem"),
  cert: fs.readFileSync(__dirname + "/cert.pem"),
})

https_sv.listen(443, () => console.log(`https server running`));
server.listen(8080, () => console.log(`Server is running`));





app.post('/test',(req,res)=>{
  ARR.push(req.body.data);
})

QueueRes(ARR);



// app.get('/',(req,res)=>{
  // try {
  //   console.log("///////")
  //   const docf = await admin.firestore().collection('test').doc('temp').get();
    
  //   // await admin.messaging().sendToDevice(
  //   //   docf.data().tokens, // ['token_1', 'token_2', ...]
  //   //   {
  //   //     data: {
  //   //       docf: JSON.stringify(docf),
  //   //     },
  //   //   },
  //   //   {
  //   //     // Required for background/quit data-only messages on iOS
  //   //     contentAvailable: true,
  //   //     // Required for background/quit data-only messages on Android
  //   //     priority: 'high',
  //   //   },
  //   // ).then(res=>{
  //   //   console.log(res)
  //   // });

  //   // await admin.messaging().sendMulticast({
  //   //   tokens: docf.data().tokens
  //   //     /* ... */
  //   //   , // ['token_1', 'token_2', ...]
  //     // notification: {
  //     //   title: 'Basic Notification',
  //     //   body: 'This is a basic notification sent from the server!',
  //     //   imageUrl: 'https://my-cdn.com/app-logo.png',
  //     // },
  //   // }).then(res=>{
  //   //   console.log(res)
  //   // });
    
  //   const message = {
  //     // token:docf.data().tokens[2],
  //     data: {
  //       type: 'warning',
  //       content: 'A new weather warning has been created!',
  //     },
  //      notification: {
  //       title: 'Basic Notification',
  //       body: 'This is a basic notification sent from the server!',
  //       imageUrl: 'https://my-cdn.com/app-logo.png',
  //     },
  //     // topic:'VietNam'
  //     condition:"'VietNam' in topics|| 'HaiPhong' in topics"
  //     };
  //   admin.messaging().send(message).then(response => {
  //     console.log('Successfully sent message:', response);
  //   })
  // } catch (err) {
  //   console.log(err)
  // }
// })


