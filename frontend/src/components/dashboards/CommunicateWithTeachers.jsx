import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function CommunicateWithTeachers() {
  const { studentId } = useParams();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendMessage = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/message/${studentId}`, {
        content: message
      });
      setStatus('Message sent successfully!');
      setMessage('');
    } catch (err) {
      setStatus('Failed to send message');
    }
  };

  return (
    <div>
      <h2>Communicate with Teachers</h2>
      <textarea
        rows={4}
        placeholder="Type your message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button onClick={sendMessage}>Send</button>
      <p>{status}</p>
    </div>
  );
}
