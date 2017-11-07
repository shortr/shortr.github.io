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
  
  var randChars = ["a","b","c","d","e","f","A","B","C","D","E","F","1","2","3","4","5","6"];
  
  //converts numbers to chars. beware using custom chars for links, they can be overwritten more easily
  function conv(){
      null;
  }
  
  bu.onclick = function(){
      var n = 0;
      ref.once("value", function(snapshot) {
          n = snapshot.numChildren();
      });
  };
  
  if(window.location.href.split("?")[1] === "" || window.location.href.split("?")[1] === undefined || window.location.href.split("?")[1] === null){
      //donothing
        setTimeout(function(){
        document.getElementById("con").style.display = "block";
        },2000);
  }else{
      //redirect
      var hi = window.location.href.split("?");
      delete hi[0];
      hi = hi.join().replace(/,/img,"");
      ref.once('value',function(s){
          if(s.hasChild(hi)){
              ref.child(hi).once('value',function(url){
                document.write("<h1>Click the window to continue to your link</h1>");
                document.write("<h6>if it doesn't work, click this link:" + "<a href='" + url.val() + "' target=_blank onclick=window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')>" + url.val() + "</>");
                window.onmousedown = function(){
                  window.open(url.val(),"_blank");
                  window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
                };
              });
          }else{
              alert("Error 404 - URL not found");
              close();
          }
      });
  }
};