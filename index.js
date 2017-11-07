window.onload = function(){
  var config = {
    apiKey: "AIzaSyCMrZkWALgQ9IC7__7LA8GG_xzhmVrONCA",
    authDomain: "rickroll-4b28d.firebaseapp.com",
    databaseURL: "https://rickroll-4b28d.firebaseio.com",
    projectId: "rickroll-4b28d",
    storageBucket: "rickroll-4b28d.appspot.com",
    messagingSenderId: "836606014111"
  };
  firebase.initializeApp(config);
  
  var ref = firebase.database().ref();
  
  if(window.location.href === "https://srr.github.io"){
      //donothing
  }else{
      //redirect
  }
};