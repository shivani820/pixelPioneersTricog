import { useState } from 'react';
import Chatbot from './components/ChatAgent'; // Make sure the path is correct
import './App.css'; // This is for the button's styling

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="app-container">
      {/* The rest of your web page content goes here */}
      
      {isChatbotOpen && <Chatbot />}
      
      <button className="chatbot-toggle-button" onClick={toggleChatbot}>
        💬
      </button>
    </div>
  );
};

export default App;