import React, { useState, useEffect } from 'react';
import { database, ref, onValue } from '../firebase';
import '../App.css';

const GroupList = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const groupRef = ref(database, 'groups');
        onValue(groupRef, (snapshot) => {
            const groupData = snapshot.val();
            const groupList = [];
            for (let id in groupData) {
                groupList.push({ id, ...groupData[id] });
            }
            setGroups(groupList);
        });
    }, []);

    return (
        <div className="group-list-container">
            <h1 className="group-list-header">All groups</h1>
            <ul className="group-list">
                {groups.map((group) => (
                    <li key={group.id} className="group-item">
                        <div className="group-name">{group.name}</div>
                        <div className="group-type">{group.type}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupList;
