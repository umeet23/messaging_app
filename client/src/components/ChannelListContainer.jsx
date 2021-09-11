import React from 'react';
import { ChannelList } from 'stream-chat-react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import ChannelSearch from './ChannelSearch';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview';
import MessageIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';

const cookies = new Cookies();

const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={MessageIcon} alt="Hospital" width="30" />
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

const ChanelListContainer = () => {
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

  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters=""
          channelRenderFilterFn={() => {}}
          List={({ children, error, loading }) => (
            <TeamChannelList
              child={children}
              error={error}
              loading={loading}
              type="team"
            />
          )}
          Preview={({ channel }) => (
            <TeamChannelPreview channel={channel} type="team" />
          )}
        />
        <ChannelList
          filters=""
          channelRenderFilterFn={() => {}}
          List={({ children, error, loading }) => (
            <TeamChannelList
              child={children}
              error={error}
              loading={loading}
              type="messaging"
            />
          )}
          Preview={({ channel }) => (
            <TeamChannelPreview channel={channel} type="messaging" />
          )}
        />
      </div>
    </>
  );
};

SideBar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default ChanelListContainer;
