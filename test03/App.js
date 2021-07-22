import React, { useEffect, useState } from 'react'
import { Text, TextInput, Button, Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import axios from 'axios'
function App() {
  const [todos, setTodos] = useState({});
  const ref = firestore().collection('test');
  const [buttonClick, setbuttonClick] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    auth().signInWithEmailAndPassword('dongnx@absoft.com.vn', '123456Aa').then(() => {
      console.log('User account signed in!');

      messaging().getToken().then(token => {
        ref.doc('temp').update({
          tokens: firestore.FieldValue.arrayUnion(token)
        })
        setToken(token)
      })
      // Update token
    }).catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });

    setTimeout(() => {
      ref.doc('temp').onSnapshot(documentSnapshot => {
        let item = documentSnapshot.data();
        setTodos(item);
      })
    }, 0.1)
    //Real time read todos => set ...
  }, [])

  useEffect(() => {
    try {
      messaging().subscribeToTopic('VietNam').then(() => {
        console.log("SUB VN thanh cong ? ")

        messaging().onMessage(async res => {
          console.log('A new FCM message arrived!', JSON.stringify(res));
          Alert.alert('A new FCM message arrived!', JSON.stringify(res));
        })
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
          // console.log('A new FCM message arrived!', JSON.stringify(remoteMessage)); 
        })
      })
    }
    catch (err) {
      console.log(err)
    }
    // Message


    //  messaging().getInitialNotification().then(remoteMessage => {
    //    console.log(remoteMessage)
    //  })
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(JSON.stringify(remoteMessage), "MO UNG DUNG TU BACKGROUND NOTIFICATION")
    });

    //Background run test
  }, [])


  const ClickHandler = async () => {

    setTimeout(() => {
     axios.post(`http://192.168.5.113:8080/test`, { data: token });
      setbuttonClick(true)
      setTimeout(() => setbuttonClick(false), 3000)
    }, 0.000001)
    // axios.get('http://192.168.5.113:8080/').then((res)=>console.log("//////////////////"))
  }

  const ChangeHandler = (text) => {
    ref.doc('temp').update({ temp: text });
  }

  return (
    <>
      <Text>{todos?.temp}</Text>
      <TextInput onChangeText={(text) => ChangeHandler(text)} />
      <Button title="Something" onPress={ClickHandler} disabled={buttonClick} />
    </>
  );
}
export default App;


