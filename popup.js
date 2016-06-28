// http://stackoverflow.com/questions/13899299/write-text-to-clipboard

function copyId(url){

  splittedUrl = url.split('?');
  splittedUrl = splittedUrl[0].split('/');
  reMusicbrainz = new RegExp('[w\.]*musicbrainz\.org','i');
  iconMusicbrainz = "http://www.google.com/s2/favicons?domain=musicbrainz.org/";
  reDiscogs = new RegExp('[w\.]*discogs\.com','i');
  iconDiscogs = "http://www.google.com/s2/favicons?domain=discogs.com/";
  reAmazon = new RegExp('[w\.]*amazon','i');
  iconAmazon = "http://www.google.com/s2/favicons?domain=amazon.com/";
  iconLost = "http://www.google.com/s2/favicons?domain=perdu.com";
  copy = false;

  if(splittedUrl[2].search(reMusicbrainz) === 0) {
    document.getElementById("icon").src = iconMusicbrainz;
    document.getElementById("source").innerHTML = "musicbrainz";
    if(splittedUrl[splittedUrl.length-2] == "release") {
      id = splittedUrl[splittedUrl.length-1];
      copy = true;
    }
    else {
      id = "no release id here";
    }
  }
  else if(splittedUrl[2].search(reDiscogs) === 0) {
    document.getElementById("icon").src = iconDiscogs;
    document.getElementById("source").innerHTML = "discogs";
    if(splittedUrl[splittedUrl.length-2] == "release") {
      id = splittedUrl[splittedUrl.length-1];
      copy = true;
    }
    else {
      id = "no release id here";
    }
  }
  else if(splittedUrl[2].search(reAmazon) === 0) {
    document.getElementById("icon").src = iconAmazon;
    document.getElementById("source").innerHTML = "amazon";
    splittedUrl.forEach(function(element, index, array) {
      if(element == "dp") {
        indexId = index;
      }
    });
    if(indexId) {
      id = splittedUrl[indexId + 1];
      copy = true;
    }
    else {
      id = "no product id here";
    }
  }
  else {
    document.getElementById("icon").src = iconLost;
    document.getElementById("source").innerHTML = "no beets id here";
    id = "no beets id to extract";
  }

  document.getElementById("text").value = id;
  document.getElementById("text").select();
  if(copy) {
    document.execCommand("Copy", false, null);
  }
}

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}

//Add Event Listeners to Button Click
document.addEventListener("DOMContentLoaded", function () {
    getCurrentTabUrl(function(url) {
      copyId(url);
    });
    document.getElementById("close").onclick = function() {
      window.close();
    }
});
