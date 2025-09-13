import React, { useEffect, useState } from 'react';
import { Form, Checkbox, Button, message } from 'antd';
import axios from 'axios';

const MultiSelectSymptomsCheckboxForm = (show, generatedId) => {
  const [form] = Form.useForm();
  const [symptomsData, setSymptomsData] = useState([]);
  const [finalData, setFinalData] = useState([]);


  // to fetch the symtoms
  const fetchSymptoms = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL}/configurations/fetchSymptoms`, {
      withCredentials: true
    });
    console.log(response)
    if (response?.status !== 200) {
      message.error('Failed to fetch symptoms');
    }
    const data = response?.data;  // axios response se data directly milta hai
    console.log(data);
    setFinalData(data)

    const options = [];

    data?.forEach(item => {
      options.push({
        label: item.symptom,
        value: item.symptom
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
    const filteredData = finalData.filter(item =>
      item.fruits?.some(symptom => values.includes(symptom))
    );

    console.log(filteredData);


  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="fruits"
        label="Select fruits"
        rules={[{ required: true, message: 'Please select at least one symtoms!' }]}
      >
        <Checkbox.Group options={symptomsData} />
      </Form.Item>

      <Form.Item>
        <Button type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MultiSelectSymptomsCheckboxForm;
