console.log("just rdy");

function getJsonFromUrl(url) {
  var query = url;
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = item[1];
    //result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

function getQueryFromJSON(obj){
  str = '';
  for(key in obj) {
    str += key + '=' + obj[key] + '&';
  }
  str = str.slice(0, str.length - 1);
  return str;
}

//fetches array with tracking pixel request URLs
function getListOfPixels(){
  tmp = ["<all_urls>"];
  return tmp;
}

function getQuery(url){
  var query = "";
  var pos = url.indexOf('?') + 1;
  query = url.slice(pos);
  
  return query;
}

function getBaseURL(url){
  var link = "";
  var pos = url.indexOf('?') + 1;
  link = url.slice(0, pos);

  return link;
}

chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
          console.log(details);
          if ( details.url.indexOf("collect") != -1 ){
              var link = getBaseURL(details.url);
              var query = getQuery(details.url);
              var queryJSON = getJsonFromUrl(query);
              
              queryJSON["dl"] = "https%3A%2F%2Fwarm-harbor-7429.herokuapp.com%2FtestpageTEST3";
              queryJSON["sr"] = "1000x1000";
              query = getQueryFromJSON(queryJSON);

              link += query;
         
          }
          return {redirectUrl: link};;
        },
        {urls: getListOfPixels()},
        ["blocking", "requestBody"]); 


