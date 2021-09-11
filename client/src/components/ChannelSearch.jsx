import React, { useState } from 'react';
// import { useChatContext } from 'stream-chat';

import { SearchIcon } from '../assets';

const ChannelSearch = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(loading);

  const getChannels = async (text) => {
    try {
      console.log(text);
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
    </div>
  );
};

export default ChannelSearch;
