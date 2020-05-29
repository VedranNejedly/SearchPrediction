function suggestionTool(currentText){
    currentText = currentText.toLowerCase();
    let words = currentText.split(" ");
    
    if(words.length>3 || currentText.length==0) return []

    let fs = require("fs");
    let content = fs.readFileSync('long.txt','utf-8').toLowerCase().split(" ");

    let allSuggestions = [];
    let suggestionPriority = {};
    let matchCounter = 0; 
    for(let i=0; i<content.length; i++){
        let contentWord = content[i];
        if(contentWord == words[matchCounter]) matchCounter++;
        else matchCounter = 0;

        if(matchCounter == words.length && i+1 < content.length){
            matchCounter = 0;
            let suggestion = words.join(" ");
            let nextContentWord = content[i+1];
            suggestion += " " + nextContentWord;

            if(suggestion in suggestionPriority) suggestionPriority[suggestion]++;
            else {
                allSuggestions.push(suggestion);
                suggestionPriority[suggestion] = 1;
            }
        }
    }

    let sortedSuggestions = allSuggestions.sort(function(first, second) {
        return suggestionPriority[second] - suggestionPriority[first];
    })
    
    let finalResults = []
    for(let i=0; i<sortedSuggestions.length; i++){
        if(i==5) break;
        console.log(sortedSuggestions[i], "\t|Appears: ", suggestionPriority[sortedSuggestions[i]], "times");
        finalResults.push(sortedSuggestions[i]);
    }
    return finalResults;
}

//console.log(suggestionTool("I am"))
//console.log(suggestionTool("I am very hungry"))
//console.log(suggestionTool("I'll be"))
//console.log(suggestionTool("As you may"))
//console.log(suggestionTool("help"))
console.log(suggestionTool("I"))