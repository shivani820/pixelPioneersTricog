import React, { useEffect, useState } from 'react';
import { Form, Checkbox, Button, message, Typography } from 'antd';
import axios from 'axios';

const MultiSelectSymptomsCheckboxForm = ({show, symptomsss}) => {
  const [form] = Form.useForm();
  const [symptomsData, setSymptomsData] = useState([]);
  const [finalData, setFinalData] = useState([]);


  // to fetch the symtoms
  const fetchSymptoms = () => {
  try {
    const options =[];
    console.log(symptomsss);
    symptomsss?.forEach(item => {
      options.push({
        label: item,
        value: item
      });
    });
    console.log(options);
    setSymptomsData(options)
  } catch (error) {
    console.error('Error fetching symptoms:', error);
  }
}

  useEffect (()=>{
    fetchSymptoms();
  },[])

  const onFinish = (values) => {
    console.log('Selected values:', values);

  };

  return (
   <>
  {show ? (
      <>
      {symptomsss?.length > 0 && (
        <>
          {symptomsss.map((symptom, index) => (
            <Typography.Title key={index} level={5}>
              {symptom}
            </Typography.Title>
          ))}
        </>
      )}
      </>
  ) : null}
</>

  );
};

export default MultiSelectSymptomsCheckboxForm;
