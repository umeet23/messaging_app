import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import PropTypes from 'prop-types';

const channelByUser = async ({
  client,
  setActiveChannel,
  channel,
  setChannel,
}) => {
  const filters = {
    type: 'messaging',
    member_count: 2,
    members: { $eq: [client.user.id, client.userID] },
  };

  const [existingChannel] = await client.queryChannels(filters);

  if (existingChannel) return setActiveChannel(existingChannel);

  const newChannel = client.channel('messaging', {
    members: [channel.id, client.userID],
  });

  setChannel(newChannel);

  return setActiveChannel(newChannel);
};

const SearchResult = ({
  channel,
  focusedId,
  type,
  setChannel,
  setToggleContainer,
}) => {
  const { client, setActiveChannel } = useChatContext();

  if (type === 'channel') {
    return (
      <div
        onClick={() => {
          setChannel(channel);
          if (setToggleContainer) {
            setToggleContainer((prevState) => !prevState);
          }
        }}
        className={
          focusedId === channel.id
            ? 'channel-search__result-container__focused'
            : 'channel-search__result-container'
        }
        role="presentation"
      >
        <div className="result-hashtag">#</div>
        <p className="channel-search__result-text">{channel.data.name}</p>
      </div>
    );
  }

  return (
    <div
      onClick={async () => {
        channelByUser({ client, setActiveChannel, channel, setChannel });
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
      className={
        focusedId === channel.id
          ? 'channel-search__result-container__focused'
          : 'channel-search__result-container'
      }
      role="presentation"
    >
      <div className="channel-search__result-user">
        <Avatar
          image={channel.image || undefined}
          name={channel.name}
          size={24}
        />
        <p className="channel-search__result-text">{channel.name}</p>
      </div>
    </div>
  );
};

const ResultsDropdown = ({
  teamChannels,
  directChannels,
  focusedId,
  loading,
  setChannel,
  setToggleContainer,
}) => {
  return (
    <div className="channel-search__results">
      <p className="channel-search__results-header">Channels</p>
      {loading && !teamChannels.length && (
        <p className="channel-search__results-header">
          <i>Loading...</i>
        </p>
      )}
      {!loading && !teamChannels.length ? (
        <p className="channel-search__results-header">
          <i>No channels found</i>
        </p>
      ) : (
        teamChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type="channel"
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
      <p className="channel-search__results-header">Users</p>
      {loading && !directChannels.length && (
        <p className="channel-search__results-header">
          <i>Loading...</i>
        </p>
      )}
      {!loading && !directChannels.length ? (
        <p className="channel-search__res ults-header">
          <i>No direct messages found</i>
        </p>
      ) : (
        directChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type="user"
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
    </div>
  );
};

SearchResult.propTypes = {
  channel: PropTypes.objectOf(PropTypes.any).isRequired,
  focusedId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setToggleContainer: PropTypes.func.isRequired,
  setChannel: PropTypes.func.isRequired,
};

ResultsDropdown.propTypes = {
  teamChannels: PropTypes.arrayOf(PropTypes.any).isRequired,
  directChannels: PropTypes.arrayOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  focusedId: PropTypes.string.isRequired,
  setToggleContainer: PropTypes.func.isRequired,
  setChannel: PropTypes.func.isRequired,
};

export default ResultsDropdown;
