// Spotify API: https://developer.spotify.com/documentation/web-api/reference/#category-albums

//route to get logged in user's info (needs the token)
export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  // save album data for a logged in user
  export const saveAlbum = (albumData, token) => {
    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(albumData),
    });
  };
  
  // remove saved album data for a logged in user
  export const deleteAlbum = (albumId, token) => {
    return fetch(`/api/users/albums/${albumId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  // make a search to spotify albums api
  export const searchSpotifyAlbums = (searchQuery) => {
    return fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=album`);
  };

  export const searchSingleAlbum = (albumId) => {
    return fetch(`https://api.spotify.com/v1/albums/${albumId}`);
  };
