//version 2.0.0
/*global firebase*/
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

  var version = "2.0.0";
  var v = document.getElementById("version");
  v.innerText = "v. " + version;

  var linksh = document.getElementById("mainlink");
  var bu = document.getElementById("submit");
  var displaytext = document.getElementById("redirlink");

  var randChars = ["a","b","c","d","e","f"];
  var randChars2 = ["A","B","C","D","E","F"];
  var randChars3 = ["1","2","3","4","5","6"];

  function conv(num){
    var nn = num;
    var nn2 = nn;
    var rep = true;
    var string = ""; //string of shortlink
    var l = 0; //length of string

    while (rep==true){
      if(nn2 >= 342){
        nn = nn2;
        nn2 = nn - 342;
        nn = 342;
      }else{
        nn = nn2;
        rep = false;
      }
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
      if(rep == true){
        //nope
      }else{
        ref.child(string).set(linksh.value);
        let clink = linksh.value;
        if(linksh.value.length >= 60){
          clink = linksh.value.substr(0,60) + "...";
        }
        displaytext.innerHTML = "<p>Success! Your link leads to " + clink + ":<br><a href=\"https://shortr.github.io/?" + string + "\">https://shortr.github.io/?" + string + "</a></p>";
      }
    }
  }

  function send(){
    displaytext.innerHTML = "<p>Loading... (0%)</p>";
    var n = 0;
    let x= new XMLHttpRequest();
    x.open("GET","https://rickroll-4b28d.firebaseio.com/.json");
    x.send();
    x.onload = function() {
      n = Object.keys(JSON.parse(x.response)).length;
      var l = JSON.parse(x.response);
      var exists = false;
      for(var i in l){
        if(l[i] === linksh.value){
          let clink = linksh.value;
          if(linksh.value.length >= 60){
            clink = linksh.value.substr(0,60) + "...";
          }
          displaytext.innerHTML = "<p>Success! Your link leads to " + clink + ":<br><a href=\"https://shortr.github.io/?" + i + "\">https://shortr.github.io/?" + i + "</a></p>";
          exists = true;
          break;
        }
      }
      if(exists === false){
        conv(n + 1);
      }
    };
    x.onprogress = function(e) {
      displaytext.innerHTML = `<p>Loading... (${((e.loaded/e.total)*100).toFixed(1)}%)</p>`;
    };
  };

  linksh.addEventListener("keydown",e=>{
    if(e.key == "Enter"){
      send();
    }
  });

  bu.onclick = send;

  if(!location.href.split("?")[1]){
    //donothing
    document.getElementById("con").style.display = "block";
  }else{
    //redirect
    var hi = window.location.href.split("?");
    delete hi[0];
    hi = hi.join().replace(/,/img,"");
    //faster loading
    ref.child(hi).once("value",function(url){
      if(url.val() !== null){
        var k = url.val().replace(/"/,"%22");
        k = url.val().replace(/'/,"%27");
        document.write("<h1>Click the window to continue to your link</h1>");
        document.write("<h4>if it doesn't work, click this link:" + "<a href='" + k + "' target=_blank onclick=window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')>" + "Click Me!" + "</a></h4><textarea width='100%' style='width: 100%'>"+k+"</textarea>");
        rhead();
        window.onmousedown = function(){
          if(url.val().search("://") == -1){
            if(url.val().search("data:") == -1){
              // if not even a url at all
              if(url.val().search("\\.") == -1){
                var w = window.open("","_blank");
                w.document.write(url.val());
                return;
              }
              window.open("https://" + url.val(),"_blank");
            }else{
              // if was a data: thing
              var newWin = window.open("","_blank");
              if(url.val().substr(0,10).search("img") != -1 || url.val().substr(0,13).search("image") != -1){
                newWin.document.write("<img src='" + k + "'/>");
              }else if(url.val().substr(0,13).search("audio") != -1){
                newWin.document.write("<audio src='" + k + "'/>");
              }else if(url.val().substr(0,13).search("video") != -1){
                newWin.document.write("<video src='" + k + "'/>");
              }else if(url.val().substr(0,14).search("html") != -1){
                try{
                  newWin.document.write(atob(url.val().split(",").slice(1).join(",")));
                }catch(err){
                  newWin.document.write(url.val().split(",").slice(1).join(","));
                }
              }else{
                newWin.document.write("<iframe src='" + k + "' frameBorder=0 width=100% height=100%>");
              }
            }
          }else{
            window.open(url.val(),"_blank");
          }
          window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        };
        if(window.ontouchstart){
          window.ontouchstart = window.onmousedown;
        }
      }else{
        alert("Error 404 - URL not found");
        window.location.replace("https://shortr.github.io");
      }
    });
  }
};

// for the rickrolling fun!
function rhead(){
  if(location.href.split("?")[1].split("&")[0] == "A" || location.href.split("?")[1].split("&")[0] == "llorkcir"){
    const imgs = ["BV.png","FW.png","hmm.png","SH.png","TP.png"];
    let m = "images/" + imgs[Math.floor(Math.random()*imgs.length)];
    const fb = `<meta property="og:image:secure_url" content="https://shortr.github.io/${m}">
    <meta property="og:image" content="http://shortr.github.io/${m}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:url" content="https://shortr.github.io/?A">
    <meta property="og:title" content="25 Top Tips For a Good Life!">
    <meta property="og:description" content="Learn how to enjoy life to the fullest!">
    <meta property="og:type" content="website">`;
    const temp = document.createElement("template");
    temp.innerHTML = fb;
    var clones = temp.content.cloneNode(true);
    document.head.append(clones);
  }
}
rhead();
