Notes:

var baseUrl = "http://www.nasdaq.com/symbol/fccy/historical";
var submitString = "10y|false|FCCY";
$.ajax({
               type: "POST",
               url: baseUrl,
               data: submitString,
               contentType: "application/json",
               success: function (response) {
                              console.log(response);
               }
});