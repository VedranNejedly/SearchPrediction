function suggestionTool(currentText){
    currentText = currentText.toLowerCase();
    let words = currentText.split(" ");
    
    if(words.length>3 || currentText.length==0) return []

    let fs = require("fs");
    let content = fs.readFileSync('long.txt','utf-8').toLowerCase().split(" ");

    let allSuggestions = [];
    let suggestionPriority = {};
    let matchCounter = 0;
	
	content.map((contentWord, i, array) =>  {
		if(contentWord == words[matchCounter]) matchCounter++;
        else matchCounter = 0;

        if(matchCounter == words.length && i+1 < array.length){
            matchCounter = 0;
            let suggestion = words.join(" ");
            let nextContentWord = array[i+1];
            suggestion += " " + nextContentWord;

            if(suggestion in suggestionPriority) suggestionPriority[suggestion]++;
            else {
                allSuggestions.push(suggestion);
                suggestionPriority[suggestion] = 1;
            }
        }
	});

    let sortedSuggestions = allSuggestions.sort(function(first, second) {
        return suggestionPriority[second] - suggestionPriority[first];
    })
    
    let finalResults = sortedSuggestions.slice(0,5);
    finalResults.forEach(suggestion => {
		console.log(suggestion, "\t|Appears: ", suggestionPriority[suggestion], "times");
	});
	
    return finalResults;
}

//console.log(suggestionTool("I am"))
//console.log(suggestionTool("I am very hungry"))
//console.log(suggestionTool("I'll be"))
//console.log(suggestionTool("As you may"))
//console.log(suggestionTool("help"))
console.log(suggestionTool("I"))