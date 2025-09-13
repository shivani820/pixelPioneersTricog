
function getSymptoms(text){
        tokens = (getTokens(text)); 
        symptomsDB = parseSymptomsJSON('Datasetab94d2b.json')
        console.log(symptomsDB);
        allAvailableSymptoms = []
        for(let i=0; i<symptomsDB.length; i++){
            allAvailableSymptoms.push(symptomsDB[i].symptom.toLowerCase());
        }
// prompt
    }

    function parseSymptomsJSON(filePath){
        const fs = require('fs');
        try {
            const jsonString = fs.readFileSync(filePath, 'utf8'); // Read synchronously
            const jsObject = JSON.parse(jsonString);
            return jsObject;
        } catch (error) {
            console.error('Error reading JSON file:', error);
            return null;
        }
    }

    function getTokens(text){
        const natural = require('natural');
        const tokenizer = new natural.WordTokenizer();
        const tokens = tokenizer.tokenize(text);
        return tokens;
    }
    getSymptoms("Hello, I am feeling feverish and have a sore throat. I feel dizziness and a headache.");
    
// Expected output: [ 'Hello', 'how', 'are', 'you', 'I', 'don', 't', 'know', 'you' ]