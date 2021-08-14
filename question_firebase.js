var firebaseConfig = {
    apiKey: "AIzaSyDTV_e1m19GlKg4sc5N7B0Wv5mAYO_o2UY",
    authDomain: "rozmebel-fa6a5.firebaseapp.com",
    databaseURL: "https://rozmebel-fa6a5-default-rtdb.firebaseio.com",
    projectId: "rozmebel-fa6a5",
    storageBucket: "rozmebel-fa6a5.appspot.com",
    messagingSenderId: "538246854850",
    appId: "1:538246854850:web:cac696058cf10bddb8e35b",
    measurementId: "G-5VNWXZQG04"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.database().ref('users/' + 'user1/' + 'qstncnt').once('value', function(snapshot){          
    if (snapshot.val() == null)
    {
        firebase.database().ref('users/' + 'user1/' + 'qstncnt').set(0)
    }
})
