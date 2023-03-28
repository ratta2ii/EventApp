import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface IProps {
    activity: IActivity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: IActivity) => void;
    submitting: boolean;
}

const ActivityForm = ({
    activity: selectedActivity,
    closeForm,
    createOrEdit,
    submitting
}: IProps) => {

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
        createOrEdit(activity);
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
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    );
}

export default ActivityForm;