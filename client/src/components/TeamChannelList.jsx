import React from 'react';
import PropTypes from 'prop-types';
import { AddChannel } from '../assets';

const TeamChannelList = ({
  child,
  error = false,
  loading,
  type,
  isCreating,
  setCreateType,
  setIsCreating,
  setIsEditing,
  setToggleContainer,
}) => {
  if (error) {
    return type === 'team' ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          Connection error. please try again
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className="team-channel-list">
        <p className="team-channel-list__message loading">
          {type === 'team' ? 'Channels' : 'Messages'} loading...
        </p>
      </div>
    );
  }

  return (
    <div className="team-channel-list">
      <div className="team-channel-list__header">
        <p className="team-channel-list__header__title">
          {type === 'team' ? 'Channels' : 'Direct Messages'}
        </p>
        <AddChannel
          isCreating={isCreating}
          setCreateType={setCreateType}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          type={type === 'team' ? 'team' : 'messaging'}
          setToggleContainer={setToggleContainer}
        />
      </div>
      {child}
    </div>
  );
};

TeamChannelList.propTypes = {
  child: PropTypes.node.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  isCreating: PropTypes.bool.isRequired,
  setCreateType: PropTypes.func.isRequired,
  setIsCreating: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  setToggleContainer: PropTypes.func,
};
TeamChannelList.defaultProps = {
  setToggleContainer: () => {},
};

export default TeamChannelList;
