var quoteAPI = "http://api.forismatic.com/api/1.0/?format=jsonp&method=getQuote&jsonp=?&lang=en";
var colors = ["#00aa00", "#1e8bc3", "#f62459", "#af851a", "#ff4500", "#e00000"];
var current = 0;
var authorNm="";
var quoteTxt="";


$(document).ready(function() {
	firstQuote();
	$("#quote-btn").on("click", function() {
		newQuote();
	});
	$("#twitter-btn").on("click", function() {
		var url="https://twitter.com/intent/tweet?text="+quoteTxt+" - "+authorNm+"&hashtags=QuoteOfTheDay";
		openURL(url);
	});
});



function newQuote() {
	$.getJSON(quoteAPI, function(json) {
		var author="";
		if(json.quoteAuthor!="")
			author=json.quoteAuthor;
		else
			author="Unknown author";
		$("blockquote").fadeOut(1000, function() {
			$(this).fadeIn(1000);
			$("#quote").text(json.quoteText).fadeIn(1000);
			$("#author").text(author).fadeIn(1000);
		});
		changeColor();
		quoteTxt=json.quoteText;
		authorNm=json.quoteAuthor;
	});
}

function firstQuote() {
	$.getJSON(quoteAPI, function(json) {
		$("#quote").html(json.quoteText);
		if(json.quoteAuthor!="")
			$("#author").html(json.quoteAuthor);
		else
			$("#author").html("Unkown author");
		quoteTxt=json.quoteText;
		authorNm=json.quoteAuthor;
	});
}

function changeColor() {
	if(current==5)
		current=0;
	else
		current++;
	$(".color").animate({color:colors[current]},2000);
	$("body").animate({backgroundColor:colors[current]},2000);
}

function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}