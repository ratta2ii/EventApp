import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const { selectedActivity: activity, openForm, cancelSelectedActivity } = activityStore;

  // TODO: This will be updated.
  if (!activity)
    return <LoadingComponent />

  return (
    <Card fluid>
      <Image src={`./assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button onClick={() => openForm(activity.id)} content='Edit' color='blue' />
          <Button onClick={cancelSelectedActivity} content='Cancel' color='grey' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default observer(ActivityDetails);