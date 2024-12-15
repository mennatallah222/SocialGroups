import React, { useState, useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

const Topic = () => {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribedTopics, setSubscribedTopics] = useState([]); 

  
  
  useEffect(() => {
    
    const savedSubscriptions = JSON.parse(localStorage.getItem("subscribedTopics")) || [];
    setSubscribedTopics(savedSubscriptions);
  }, []);

  const handleTopicAction = (topic, action) => {
    const trimmedTopic = topic.trim();
    if (!trimmedTopic) {
      alert("Please enter a valid topic.");
      return;
    }

    setLoading(true); 

    getToken(messaging).then((token) => {
      if (!token) {
        setMessage("No FCM token received. Please try again.");
        setLoading(false);
        return;
      }

      const endpoint =
        action === "subscribe"
          ? "http://localhost:5000/subscribe"
          : "http://localhost:5000/unsubscribe";

      const requestPayload = {
        topic: trimmedTopic,
        registrationTokens: [token], 
      };

      fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(requestPayload),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false); 
          if (data.message) {
            const updatedTopics = action === "subscribe"
              ? [...subscribedTopics, trimmedTopic] 
              : subscribedTopics.filter((t) => t !== trimmedTopic); 

            
            localStorage.setItem("subscribedTopics", JSON.stringify(updatedTopics));

            setSubscribedTopics(updatedTopics); 
            setMessage(
              `${action === "subscribe" ? "Subscribed to" : "Unsubscribed from"} topic: ${trimmedTopic}`
            );
          } else {
            setMessage(`Failed to ${action} topic: ${trimmedTopic}`);
          }
        })
        .catch((error) => {
          setLoading(false); 
          console.error(`Error during ${action}:`, error);
          setMessage(`Failed to ${action} topic: ${trimmedTopic}`);
        });
    });
  };

  return (
    <div className="form-container">
      <h3 className="title">Manage Topic Subscriptions</h3>
      <div className="form-wrapper">
         
      <div className="topic-subscription">
        <div className="topic-input">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic name"
            className="form-input"
          />
        </div>
        <div className="topic-buttons">
          <button
            className="subscribe-button"
            onClick={() => handleTopicAction(topic, "subscribe")}
            disabled={loading} 
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
          <button
            className="unsubscribe-button"
            onClick={() => handleTopicAction(topic, "unsubscribe")}
            disabled={loading} 
          >
            {loading ? "Unsubscribing..." : "Unsubscribe"}
          </button>
        </div>
        {message && <p className="status-message">{message}</p>}
      </div>
      </div>

      <div className="current-subscriptions">
        <h4>Currently Subscribed to Topics:</h4>
        <ul>
          {subscribedTopics.length > 0 ? (
            subscribedTopics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))
          ) : (
            <p>No subscriptions yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Topic;
