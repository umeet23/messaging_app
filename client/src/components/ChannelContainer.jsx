import React from 'react';
import PropTypes from 'prop-types';
import { Channel, MessageTeam } from 'stream-chat-react';
import { ChannelInner, EditChannel, CreateChannel } from './channels';

const ChannelContainer = ({
  isCreating,
  isEditing,
  setIsCreating,
  setIsEditing,
  createType,
}) => {
  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">
        This is the beginningof your chat history.
      </p>
      <p className="channel-empty__second">
        Send message, attachments, links, emojis and more.
      </p>
    </div>
  );

  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  return (
    <div className="channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => (
          <MessageTeam key={i} props={messageProps} />
        )}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};
ChannelContainer.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  setIsCreating: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  createType: PropTypes.string.isRequired,
};
export default ChannelContainer;
