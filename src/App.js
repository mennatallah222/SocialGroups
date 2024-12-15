import React, { useEffect } from "react";
import { messaging,  onMessage } from "./firebase";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GroupForm from "./Components/GroupForm";
import GroupList from "./Components/GroupList";
import Topic from "./Components/Topic";
import "./App.css";

const App = () => {
  useEffect(() => {
    

    onMessage(messaging, (payload) => {
      console.log("Message received in foreground:", payload);
      handleTopicSubscription(payload.data);
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
    
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTopicSubscription = (data) => {
    if (data.subscribeToTopic) {
      
      subscribeToTopic(data.subscribeToTopic);
    } else if (data.unsubscribeToTopic) {
      
      unsubscribeFromTopic(data.unsubscribeToTopic);
    }
  };

  const subscribeToTopic = (topic) => {
    
    console.log(`Subscribing to topic: ${topic}`);
    
  };

  const unsubscribeFromTopic = (topic) => {
    
    console.log(`Unsubscribing from topic: ${topic}`);
    
  };


  return (
    <Router>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/add-group">Add a group</Link>
          </li>
          <li>
            <Link to="/groups-list">Groups list</Link>
          </li>
          <li>
            <Link to="/manage-topics">Manage Topics</Link>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <Routes>
          <Route path="/add-group" element={<GroupForm />} />
          <Route path="/groups-list" element={<GroupList />} />
          <Route path="/manage-topics" element={<Topic />} />
          <Route path="*" element={<GroupForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
