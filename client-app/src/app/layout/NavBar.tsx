import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

const NavBar = () => {
  const { activityStore } = useStore();

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header >
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 10 }} />
          Event App
        </Menu.Item>
        <Menu.Item name='Events' />
        <Menu.Item>
          <Button onClick={() => activityStore.openForm()} positive content='Create Event' />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default observer(NavBar);