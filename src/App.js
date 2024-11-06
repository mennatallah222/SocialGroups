// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GroupForm from './Components/GroupForm';
import GroupList from './Components/GroupList';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="navbar">
                <ul>
                    <li>
                        <Link to="/add-group">add a group</Link>
                    </li>
                    <li>
                        <Link to="/groups-list">groups list</Link>
                    </li>
                </ul>
            </div>

            <div className="main-content">
                <Routes>
                    <Route path="/add-group" element={<GroupForm />} />
                    <Route path="/groups-list" element={<GroupList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
