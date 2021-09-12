import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import PropTypes from 'prop-types';
import { CloseCreateChannel } from '../../assets';
import { UserList } from '..';

const ChannelNameInput = ({ channelName, setChannelName }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value);
  };

  return (
    <div className=" channel-name-input__wrapper">
      <p>Name</p>
      <input
        type="text"
        placeholder="Channel Name (no spaces)"
        onChange={handleChange}
        value={channelName}
      />
      <p>Add Members</p>
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectUsers, setSelectUsers] = useState([client.userID || '']);
  const [channelName, setChannelName] = useState('');

  const createChannel = async (e) => {
    e.preventDefault();
    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectUsers,
      });
      await newChannel.watch();
      setChannelName('');
      setIsCreating(false);
      setSelectUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>
          {createType === 'team'
            ? 'Create a new Channel'
            : 'Send a direct Message'}
        </p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === 'team' && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList setSelectUsers={setSelectUsers} />
      <div
        className="create-channel__button-wrapper"
        onClick={createChannel}
        role="presentation"
      >
        <p>
          {createType === 'team' ? 'Create Channel' : 'Create Message Group'}
        </p>
      </div>
    </div>
  );
};

ChannelNameInput.propTypes = {
  channelName: PropTypes.bool,
  setChannelName: PropTypes.func.isRequired,
};

ChannelNameInput.defaultProps = {
  channelName: '',
};

CreateChannel.propTypes = {
  createType: PropTypes.string.isRequired,
  setIsCreating: PropTypes.func.isRequired,
};

export default CreateChannel;
