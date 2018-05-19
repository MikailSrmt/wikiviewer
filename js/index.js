function randomWiki() {
  window.open('https://en.wikipedia.org/wiki/Special:Random')
};

function getSearch() {
  var mUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&list=&continue=&titles=Main+Page&generator=search&formatversion=2&exsentences=2&exlimit=30&exintro=1&explaintext=1&exsectionformat=raw&gsrsearch=' + document.getElementById("search-box").value + '&gsrnamespace=&gsrlimit=15&gsrqiprofile=wsum_inclinks';
  //alert(mUrl);
  $.ajax({
    url: mUrl,
    dataType: 'jsonp',
    success: function(searchResult) {
      var resultCount = searchResult["query"]["pages"].length;
      var i;
      for (i = 0; i < resultCount; i++) {
        var pageId = searchResult["query"]["pages"][i]["pageid"];
        var pageLink = 'https://en.wikipedia.org/?curid=' + pageId;
        
        $("#resultRow").append("<a href=" + pageLink + "> <div id=\"result" + i  + "\" " + "class=\"suggestionRow hvr-glow\""+ "><br></div> </a>")
        
        var title = searchResult["query"]["pages"][i]["title"];
        $('#result' + i).html("<h3>"+title+"</h3>");
        
      /*  $("#resultRow").append("<a href=" + pageLink + "> <div id=\"extract" + i + "\"><br></div> </a>")*/
        var extract = searchResult["query"]["pages"][i]["extract"];
        $('#result' + i).append("<p>"+extract+"</p>");
      }
     /* var extract1 = searchResult["query"]["pages"][0]["extract"];
      $('#extract1').html(extract1 + "<br>");*/
    }
  })
};

document.getElementById("search-box")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("search-button").click();
    }
});