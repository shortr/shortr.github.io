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
  
  var linksh = document.getElementById("mainlink");
  var secret = document.getElementById("itself");
  var bu = document.getElementById("submit");
  var displaytext = document.getElementById("redirlink");
  
  var randChars = ["a","b","c","d","e","f","A","B","C","D","E","F"];
  
  bu.onclick = function(){
      
  }
  
  if(window.location.href.split("?")[1] === "" || window.location.href.split("?")[1] === undefined || window.location.href.split("?")[1] === null){
      //donothing
  }else{
      //redirect
      var hi = window.location.href.split("?");
      delete hi[0];
      hi = hi.join().replace(/,/img,"");
      ref.once('value',function(s){
          if(s.hasChild(hi)){
              ref.child(hi).once('value',function(url){
                  window.open(url.val());
                  window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
              });
          }else{
              alert("Error 404 - URL not found");
              close();
          }
      });
  }
};