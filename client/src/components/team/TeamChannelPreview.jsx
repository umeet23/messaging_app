import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({
  channel,
  type,
  setToggleContainer,
  setIsCreating,
  setIsEditing,
}) => {
  const { channel: activeChannel, setActiveChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p className="channel-preview__item">
      # {channel?.data?.name || channel?.data?.id}
    </p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel?.state?.members).filter(
      ({ user }) => user.id !== client.userID
    );
    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName}
          size={24}
        />
        <p>{members[0]?.user?.fullName}</p>
      </div>
    );
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? 'channel-preview__wrapper__selected'
          : 'channel-preview__wrapper'
      }
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
        if (setToggleContainer) {
          setToggleContainer((prevToggleContainer) => !prevToggleContainer);
        }
      }}
      role="presentation"
    >
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

TeamChannelPreview.propTypes = {
  channel: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setToggleContainer: PropTypes.func,
  setIsCreating: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
};

TeamChannelPreview.defaultProps = {
  setToggleContainer: () => {},
};
export default TeamChannelPreview;
