import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import PropTypes from 'prop-types';
import { SearchIcon } from '../assets';
import { ResultsDropdown } from '.';

const ChannelSearch = ({ setToggleContainer }) => {
  const { client, channel, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  useEffect(() => {
    if (!query) {
      setDirectChannels([]);
      setTeamChannels([]);
    }
  }, [query]);

  const getChannels = async (text) => {
    try {
      const channelResponse = client.queryChannels({
        type: 'team',
        name: { $autocomplete: text },
        members: { $in: [client.userID] },
      });
      const usersResponse = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text },
      });
      const [channels, { users }] = await Promise.all([
        channelResponse,
        usersResponse,
      ]);
      if (channels.length) setTeamChannels(channels);
      if (users.length) setDirectChannels(users);
    } catch (error) {
      setQuery('');
    }
  };

  const onSearch = (e) => {
    const searchQuery = e.target.value;
    e.preventDefault();
    setLoading(true);
    setQuery(searchQuery);
    getChannels(searchQuery);
  };

  const setChannel = (channelObject) => {
    setQuery('');
    setActiveChannel(channelObject);
  };

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input
          className="channel-search__input__text"
          type="text"
          placeholder="Search"
          value={query}
          onChange={onSearch}
        />
      </div>
      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          focusedId={channel.id}
          setToggleContainer={setToggleContainer}
          setChannel={setChannel}
        />
      )}
    </div>
  );
};

ChannelSearch.propTypes = {
  setToggleContainer: PropTypes.func.isRequired,
};

export default ChannelSearch;
