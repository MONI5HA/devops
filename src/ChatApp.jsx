import axios from 'axios';
import React, { useState } from 'react';

function ChatApp({ onsendData }) {
  const [prompt, setPrompt] = useState('Give me one vocabular now in this format so that i can split that later !!pls put + sign in btw very important (word + meaning + example');
  const [response, setResponse] = useState('');
  const [loading, isLoading] = useState(false);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/chat', { prompt });
      setResponse(res.data.data);
      onsendData(res.data.data.split('+'));
    } catch (e) {
      console.log(e);
      setResponse('Sorry, something went wrong.');
    }

  
  };

  return (
    <div>
      <h1>Ask ChatGPT</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={handleChange}
          placeholder="Ask me something..."
          style={{ width: '100%', height: '100px' }}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "loading..." : "Ask"}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
          <h1>Response :</h1>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default ChatApp;
