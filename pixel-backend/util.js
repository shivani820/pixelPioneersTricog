// This is a conceptual example and requires a Mistral AI API key and potentially a client library.
// For actual implementation, refer to Mistral AI documentation and relevant SDKs (e.g., LangChain.js).

const { get } = require('http');

const mistralApiKey = "fMbIFK1T8Zhtu5yDgtFipbyeZ12J7y9W"; // Replace with your actual API key

async function generateTextWithMistral(prompt) {
  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${mistralApiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-tiny", // Or other Mistral models like mistral-large, mistral-medium
        messages: [{ role: "user", content: prompt }],
        stream: false, // Set to true for streaming responses
      }),
    });

    const data = await response.json();
    console.log(data.choices[0].message.content);
    return data.choices[0].message.content;

  } catch (error) {
    console.error("Error calling Mistral AI API:", error);
    return null;
  }
}

// Example usage

function getSymptoms(text){ 
        symptomsDB = parseSymptomsJSON('Datasetab94d2b.json')
        //console.log(symptomsDB);
        allAvailableSymptoms = []
        for(let i=0; i<symptomsDB.length; i++){
            allAvailableSymptoms.push(symptomsDB[i].symptom.toLowerCase());
        }
// prompt
        symptomsFromDesc = generateTextWithMistral("return a list of all the symptoms strictly from the following text: "+text+ "which are present in this list: "+allAvailableSymptoms.toString()+". Return the output as a comma separated string of symptoms only. If symptoms are not present in "+allAvailableSymptoms.toString()+", return just 'null' string with no other text.");
        console.log(symptomsFromDesc);
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
    user = getSymptoms("Hello, I had heart attack 2 years back. I am experiencing chest pain and shortness of breath.");
    console.log(user);
    
function getUserNameFromText(text){
    userName = generateTextWithMistral("Extract the name of the user from this text: "+text+". If no name is present, return 'null' string with no other text.");
    console.log(userName);
    return userName;
}

function getUserEmailFromText(text){
    userEmail = generateTextWithMistral("Extract the email id of the user from this text: "+text+". If no email id in proper format is present, return 'null' string with no other text.");

    console.log("\n\n\n"+userEmail);
}

//sueremail = getUserEmailFromText("Hello, my email id is abc");