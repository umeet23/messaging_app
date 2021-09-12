import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import PropTypes from 'prop-types';
import { InviteIcon } from '../assets';

const ListContainer = ({ children }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};

const UserItem = ({ image, fullName, id, setSelectUsers }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    if (selected) {
      setSelectUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== id)
      );
    } else {
      setSelectUsers((prevUsers) => [...prevUsers, id]);
    }
    setSelected((prevSelected) => !prevSelected);
  };

  return (
    <div
      className="user-item__wrapper"
      onClick={handleSelect}
      role="presentation"
    >
      <div className="user-item__wrapper-name">
        <Avatar image={image} name={fullName || id} size="32" />
        <p className="user-item__name">{fullName || id}</p>
      </div>
      {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
    </div>
  );
};

const UserList = ({ setSelectUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 10 }
        );
        if (response?.users?.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      }
      setLoading(false);
    };
    if (client) getUsers();
  }, []);

  if (error) {
    return (
      <ListContainer>
        <div className="user-list__message">
          Error Loading please refresh and try again
        </div>
      </ListContainer>
    );
  }
  if (listEmpty) {
    return (
      <ListContainer>
        <div className="user-list__message">No users found</div>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {loading ? (
        <div className="user-list__message">Loading users... </div>
      ) : (
        users?.map((user, i) => (
          <UserItem
            key={user.id}
            index={i}
            image={user.image}
            fullName={user.fullName}
            id={user.id}
            setSelectUsers={setSelectUsers}
          />
        ))
      )}
    </ListContainer>
  );
};

ListContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

UserItem.propTypes = {
  image: PropTypes.string,
  fullName: PropTypes.string,
  id: PropTypes.string.isRequired,
  setSelectUsers: PropTypes.func.isRequired,
};

UserItem.defaultProps = {
  fullName: '',
  image: '',
};

UserList.propTypes = {
  setSelectUsers: PropTypes.func.isRequired,
};

export default UserList;
