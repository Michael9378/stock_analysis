function parseCSV(csvContent, hasHeaderRow, rowDelimiter= "\n", colDelimiter= ",", dataWrapper= "\""){
	
	// holds the parsed CSV data to be returned
	var parsedLines = [];
	var headers = [];
	var lineNum = 0;
	
	// split on new lines
	var lines = csvContent.split(rowDelimiter);
	
	// check if first line is headers
	if(hasHeaderRow){
		// grab the headers and save
		var thisLine = lines[0];
		thisLine = thisLine.substr(thisLine.indexOf(dataWrapper) + 1);
		
		var headers = thisLine.split(dataWrapper+colDelimiter+dataWrapper);
		var last = headers[headers.length-1]
		headers[headers.length-1] = last.substr(0, last.indexOf(dataWrapper));
		// start at line 1 now
		lineNum++;
	}
	
	// begin parsing of actual data
	for(lineNum; lineNum < lines.length; lineNum++){

		var thisLine = lines[lineNum];
		thisLine = thisLine.substr(thisLine.indexOf(dataWrapper) + 1);
		
		var columns = thisLine.split(dataWrapper+colDelimiter+dataWrapper);
		var last = columns[columns.length-1];
		columns[columns.length-1] = last.substr(0, last.indexOf(dataWrapper));
		
		if(hasHeaderRow){
			// make te current line into an object and push to parsed data
			var thisLine = {};
			// if our column lengths dont match what we expect, pop out
			if(columns.length != headers.length )
				return parsedLines;

			for(var i = 0; i < columns.length; i++){
				thisLine[headers[i]] = columns[i];
			}
			parsedLines[lineNum-1] = thisLine;
		}
		else{ 
			// no header row. Just split the line and add to lines
			if(parsedLines[lineNum-1].length != columns )
				return parsedLines;

			parsedLines[lineNum] = columns;
		}
	}
	return parsedLines;
}

var symbols = [];

$.ajax({
	type: "POST",
	url: "http://projects.michaeljscott.net/stock_analysis/api/summary/get/",
	success: function (response) {
		symbols = JSON.parse(response);
		recursiveTimeoutLoop(0);
	}
 });

 function recursiveTimeoutLoop(index){
	var data;
	var curSymbol = symbols[index].company_symbol;
	var baseUrl = "http://www.nasdaq.com/symbol/"+curSymbol.toLowerCase()+"/historical";
	var submitString = "10y|true|"+curSymbol;

	$.ajax({
		type: "POST",
		url: baseUrl,
		data: submitString,
		contentType: "application/json",
		success: function (response) {
			data = parseCSV(response, true);
			afterResponse(data, curSymbol);
			index++;
			// recursiveTimeoutLoop(index);
		}
	});
 }

function afterResponse(data, curSymbol){
	for(var i = 0; i < data.length; i++ ){
		// holds new object
		formatData[i] = {};
		var slashRE = new RegExp('/', 'g');
		var commaRE = new RegExp(',', 'g');

		// if the last data is from today, it will be in the format HH:MM so check for that and just grab the current day
		if(data[i].date.indexOf(":") == -1 )
			formatData[i].stats_date = data[i].date.replace(slashRE, "-");
		else
			formatData[i].stats_date = new Date().toISOString().split("T")[0];

		formatData[i].company_symbol = curSymbol;
		formatData[i].stats_open = data[i].open;
		formatData[i].stats_close = data[i].close;
		formatData[i].stats_high = data[i].high;
		formatData[i].stats_low = data[i].low;
		formatData[i].stats_volume = Math.round(data[i].volume.replace(commaRE, ""));
	}

	$.ajax({
	   type: "POST",
	   url: "http://projects.michaeljscott.net/stock_analysis/api/dailyStats/set/",
	   data: {daily_stats: JSON.stringify(formatData)},
	   success: function (response) {
			console.log(response);
	   }
	});
	
}
