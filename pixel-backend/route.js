const express = require('express');
const { getUserNameFromText } = require('./util');
const { generateTextWithMistral } = require('./check');
const router = express.Router()

// GET /configurations to fetch the slots
router.get('/fetchSlots', async (req, res) => {
  try {
    const db = req.db
    const doctorId = await db.collection('doctors_details').findOne({})
    const requestParams = {
      doctor_id: doctorId,
      date: req.query.date
    }
    console.log(requestParams);
    const data = await db.collection('doctor-patient-booking').find(requestParams, {'_id': 0, 'time_slot': 1}).toArray()
    console.log(data)
    let finalArray = [];
    data.map(item => finalArray.push(item.time_slot));
    res.status(200).json(finalArray)
    return res;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch final Slot of doctors' })
  }
});

// Fetch symptoms from MongoDB
router.get('/fetchSymptoms', async (req, res) => {
  try {
    const db = req.db;
    const data = await db.collection('symtoms').find({}).toArray(); // ✅ await the DB query
    res.status(200).json(data); // ✅ send the response
    return res;
  } catch (err) {
    console.error("❌ Error fetching symptoms:", err);
    res.status(500).json({ error: 'Failed to fetch symptoms' });
    return res;
  }
});



// POST /configurations
router.post('/generateId', async (req, res) => {
  try {
    const db = req.db
    const newConfig = req.body
    const result = await db.collection('configuration').insertOne(newConfig)
    res.status(200).json(result.insertedId);
    return res;
  } catch (err) {
    res.status(500).json({ error: 'Failed to add configuration' })
    return res;
  }
})


router.post('/name', async (req, res) => {
  try {
    console.log(req.body);
    console.log("Extract the name of the user from this text: "+req.body.name+". If no name is present, return 'null' string with no other text.")
    userName = await generateTextWithMistral("Extract the name of the user from this text: "+req.body.name+". If no name is present, return 'null' string with no other text.");
    console.log(userName);
    res.status(200).json(userName);
    return res;
  } catch (err) {
    res.status(500).json({ error: 'Failed to add configuration' })
    return res;
  }
})


router.post('/email', async (req, res) => {
  try {
    console.log(req.body);
    console.log("Extract the email id of the user from this text: "+req.body.email+". If no email id in proper format is present, return 'null' string with no other text.")
    userEmail= await generateTextWithMistral("Extract the email id of the user from this text: "+req.body.email+". If no email id in proper format is present, return 'null' string with no other text.");
    console.log(userEmail);
    res.status(200).json(userEmail);
    return res;
  } catch (err) {
    res.status(500).json({ error: 'Failed to add configuration' })
    return res;
  }
})



router.post('/symptomsCheck', async (req, res) => {
  try {
    console.log(req.body.symptoms);
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
    symptomsDB = parseSymptomsJSON('Datasetab94d2b.json')
    console.log(symptomsDB);
    allAvailableSymptoms = []
    for(let i=0; i<symptomsDB.length; i++){
        allAvailableSymptoms.push(symptomsDB[i].symptom.toLowerCase());
    }
    // prompt
    symptomsFromDesc = await generateTextWithMistral("return a list of all the symptoms strictly from the following text: "+req.body.symptoms+ "which are present in this list: "+allAvailableSymptoms.toString()+". Return the output as a comma separated string of symptoms only. If symptoms are not present in "+allAvailableSymptoms.toString()+", return just 'null' string with no other text.");
    
    const arr = symptomsFromDesc.split(",");
    res.status(200).json(arr);
    console.log(arr);
    return res;
  } catch (err) {
    res.status(500).json({ error: 'Failed to add configuration' })
    return res;
  }
})

module.exports = router
