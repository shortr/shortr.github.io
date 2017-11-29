//version 1.1.2

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
  
  var version = "1.1.4";
  var v = document.getElementById("version");
  v.innerText = "v. " + version;
  
  var linksh = document.getElementById("mainlink");
  var bu = document.getElementById("submit");
  var displaytext = document.getElementById("redirlink");
  
  var randChars = ["a","b","c","d","e","f"];
  var randChars2 = ["A","B","C","D","E","F"];
  var randChars3 = ["1","2","3","4","5","6"];
  
  //converts numbers to chars. beware using custom chars for links, they can be overwritten more easily
  function conv(num){
    var nn = num;
    var string = ""; //string of shortlink
    var l = 0; //length of string
    if(Math.floor(nn/49)-1 >= 0){
      string = string + randChars3[Math.floor(nn/49)-1];
    }
    nn = nn % 49;
    if(Math.floor(nn/7)-1 >= 0){
      string = string + randChars2[Math.floor(nn/7)-1];
    }
    nn = nn % 7;
    if(nn - 1 >= 0){
      string = string + randChars[nn - 1];
    }
    ref.child(string).set(linksh.value);
    displaytext.innerText = "Success! Your link leads to " + linksh.value + ": https://shortr.github.io/?" + string;
  }
  
  bu.onclick = function(){
      var n = 0;
      ref.once("value", function(snapshot) {
          n = snapshot.numChildren();
          var l = snapshot.val();
          var exists = false;
          for(var i in l){
            if(l[i] === linksh.value){
              displaytext.innerText = "Success! Your link leads to " + linksh.value + ": https://shortr.github.io/?" + i;
              exists = true;
              break;
            }
          }
          if(exists === false){
            conv(n + 1);
          }
      });
  };
  
  if(window.location.href.split("?")[1] === "_c9_id=livepreview3&_c9_host=https://ide.c9.io" || window.location.href.split("?")[1] === "_c9_id=livepreview0&_c9_host=https://ide.c9.io" || window.location.href.split("?")[1] === "_c9_id=livepreview1&_c9_host=https://ide.c9.io" || window.location.href.split("?")[1] === "" || window.location.href.split("?")[1] === undefined || window.location.href.split("?")[1] === null){
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
                document.write("<h4>if it doesn't work, click this link:" + "<a href='" + url.val() + "' target=_blank onclick=window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')>" + url.val() + "</a></h4>");
                window.onmousedown = function(){
                  if(url.val().search("://") === -1){
                    window.open("https://" + url.val(),"_blank");
                  }else{
                    window.open(url.val(),"_blank");
                  }
                  window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
                };
              });
          }else{
              alert("Error 404 - URL not found");
              window.location.replace("https://shortr.github.io");
          }
      });
  }
};