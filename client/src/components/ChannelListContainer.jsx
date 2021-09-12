import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import ChannelSearch from './ChannelSearch';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './team/TeamChannelPreview';
import MessageIcon from '../assets/chat.png';
import LogoutIcon from '../assets/logout.png';

const cookies = new Cookies();

const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={MessageIcon} alt="Chat" width="30" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout} role="presentation">
        <img src={LogoutIcon} alt="logout" width="30" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Messaging App</p>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
};

const ChanelListContent = ({
  isCreating,
  setCreateType,
  setIsCreating,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext();
  const logout = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('phoneNumber');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    window.location.reload();
  };

  const filters = { members: { $in: [client.userID] } };
  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={({ children, error, loading }) => (
            <TeamChannelList
              child={children}
              error={error}
              loading={loading}
              type="team"
              isCreating={isCreating}
              setCreateType={setCreateType}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={({ channel }) => (
            <TeamChannelPreview
              channel={channel}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={({ children, error, loading }) => (
            <TeamChannelList
              child={children}
              error={error}
              loading={loading}
              type="messaging"
              isCreating={isCreating}
              setCreateType={setCreateType}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={({ channel }) => (
            <TeamChannelPreview
              channel={channel}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
};

const ChanelListContainer = ({
  isCreating,
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);
  return (
    <>
      <div className="channel-list__container">
        <ChanelListContent
          isCreating={isCreating}
          setCreateType={setCreateType}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
        />
      </div>
      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? '0%' : '-89%',
          backgroundColor: '#005FFF',
        }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() =>
            setToggleContainer((prevToggleContainer) => !prevToggleContainer)
          }
          role="presentation"
        >
          <ChanelListContent
            isCreating={isCreating}
            setCreateType={setCreateType}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
          />
        </div>
      </div>
    </>
  );
};

SideBar.propTypes = {
  logout: PropTypes.func.isRequired,
};
ChanelListContent.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  setCreateType: PropTypes.func.isRequired,
  setIsCreating: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  setToggleContainer: PropTypes.func,
};

ChanelListContent.defaultProps = {
  setToggleContainer: () => {},
};

ChanelListContainer.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  setCreateType: PropTypes.func.isRequired,
  setIsCreating: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
};

export default ChanelListContainer;
