import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

const ActivityForm = () => {
  const { activityStore } = useStore();
  const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore;

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  }

  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    activity.id 
      ? updateActivity(activity) 
      : createActivity(activity);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autocomlete='off'>
        <Form.Input placeholder='Title' onChange={handleInputChange} name='title' value={activity.title} />
        <Form.TextArea placeholder='Description' onChange={handleInputChange} name='description' value={activity.description} />
        <Form.Input placeholder='Category' onChange={handleInputChange} name='category' value={activity.category} />
        <Form.Input placeholder='Date' type='date' onChange={handleInputChange} name='date' value={activity.date} />
        <Form.Input placeholder='City' onChange={handleInputChange} name='city' value={activity.city} />
        <Form.Input placeholder='Venue' onChange={handleInputChange} name='venue' value={activity.venue} />
        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
}

export default observer(ActivityForm);