import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { IActivity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';

const ActivityForm = () => {
  const { id } = useParams();
  const { activityStore } = useStore();
  const navigate = useNavigate();

  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  });

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!));
  }, [id, loadActivity]);

  function handleSubmit() {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity)
        .then(() => navigate(`/activities/${activity.id}`));
    }
    else
      updateActivity(activity)
        .then(() => navigate(`/activities/${activity.id}`));
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  if (loadingInitial)
    return <LoadingComponent content='Loading activity...' />

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
        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
}

export default observer(ActivityForm);