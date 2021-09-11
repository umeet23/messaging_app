import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import './App.css';

import { ChannelListContainer, ChannelContainer, Auth } from './components';

const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_KEY);
const cookies = new Cookies();
const authToken = cookies.get('token');
if (authToken) {
  client.connectUser(
    {
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      phoneNumber: cookies.get('phoneNumber'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
    },
    authToken
  );
}

const App = () => {
  if (!authToken) {
    return <Auth />;
  }

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
