import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, Button } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';

function App() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/activities")
            .then(response => {
                console.log({ API_RESPONSE: response });
                setActivities(response.data);
            });
    }, []);

    return (
        <div>
            <Header as='h2' icon='users' content='Event App' />
            <List>
                {activities.map((activity: any) => (
                    <List.Item key={activity.id}>
                        {activity.title}
                    </List.Item>
                ))}
            </List>
            <Button content='test' />
        </div>
    );
}

export default App;
