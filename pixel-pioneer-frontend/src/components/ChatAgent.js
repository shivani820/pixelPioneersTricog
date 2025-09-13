import React, { useState } from 'react';
import './Chatbot.css';
import DoctorAppointment from '../DoctorAppointment/doctor-appointment';
import MultiSelectSymptomsCheckboxForm from '../Symtoms/symtoms';
import { message } from 'antd';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0); // 0: name, 1: email, 2: symptoms, 3: finished
  const [userData, setUserData] = useState({ name: '', email: '', symptoms: '' });
  const [error, setError] = useState('');
  const [generatedId, setGeneratedId] = useState(null); // State to hold the generated ID

  const getInsertedId = async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_URL}/configurations/generateId`, {
      withCredentials: true
    });

    if (response?.status !== 200) {
      message.error('Failed to generate ID');
      return;
    }

    const data = response.data; // No need for optional chaining after a successful request
    console.log("🆔 Generated ID:", data);

    // Do something with the ID (e.g., save to state)
    setGeneratedId(data.id); // If you have a state hook

  } catch (error) {
    console.error('❌ Error fetching ID:', error);
    message.error('Error generating ID');
  }
};


  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name.trim());
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    setError('');
    if (!input.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user' }]);
    getInsertedId(); // Call the function to get the ID when user sends a message

    switch (step) {
      case 0:
        if (validateName(input)) {
          setUserData({ ...userData, name: input });
          setMessages((prevMessages) => [...prevMessages, { text: `Hello, ${input}! What is your email address?`, sender: 'bot' }]);
          setStep(1);
        } else {
          setError('Please enter a valid name with only alphabets.');
          setMessages((prevMessages) => [...prevMessages, { text: 'That doesn\'t look like a valid name. Please use only letters and spaces.', sender: 'bot' }]);
        }
        break;
      case 1:
        if (validateEmail(input)) {
          setUserData({ ...userData, email: input });
          setMessages((prevMessages) => [...prevMessages, { text: 'Thank you. Please list your main symptoms (e.g., chest pain, shortness of breath, fatigue).', sender: 'bot' }]);
          setStep(2);
        } else {
          setError('Please enter a valid email address.');
          setMessages((prevMessages) => [...prevMessages, { text: 'That email format is invalid. Please enter a correct email address.', sender: 'bot' }]);
        }
        break;
       case 2:
        // No specific validation needed for symptoms, as it's free-form text
        setUserData({ ...userData, symptoms: input });
        setMessages((prevMessages) => [...prevMessages, { text: <MultiSelectSymptomsCheckboxForm generatedId={generatedId} />, sender: 'bot' }]);
        setStep(3);
        console.log('Final Data:', { ...userData, symptoms: input });
        break;
      case 3:
        // No specific validation needed for symptoms, as it's free-form text
        setUserData({ ...userData, doctorAppointment: input });
        setMessages((prevMessages) => [...prevMessages, { text: <DoctorAppointment/>, sender: 'bot' }]);
        setStep(4);
        console.log('Final Data:', { ...userData, doctorAppointment: input });
        break;
      default:
        setMessages((prevMessages) => [...prevMessages, { text: 'How can I help you?', sender: 'bot' }]);
        break;
    }

    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {step === 0 && (
          <div className="message bot">
            Hi there! What is your name?
          </div>
        )}
        {error && <div className="message error">{error}</div>}
      </div>
      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;