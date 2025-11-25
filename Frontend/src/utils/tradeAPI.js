// Simple trade API helper using fetch
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const mapServerPostToClient = (post) => {
  return {
    ...post,
    id: post._id || post.id,
    timePosted: post.createdAt || post.timePosted,
    tags: post.tags || [],
    likes: post.likes || 0,
    comments: post.comments || 0,
    tradeRequests: post.tradeRequests || 0,
    isLiked: post.isLiked || false,
    postedBy: post.createdBy
      ? {
        id: post.createdBy._id,
        username: post.createdBy.name,
        avatar: post.createdBy.avatar,
      }
      : post.postedBy || { id: 'unknown', username: 'unknown' },
  };
};

export const fetchPosts = async (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/api/trade/posts${qs ? `?${qs}` : ''}`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  const data = await res.json();
  // data.posts expected
  return data.posts.map(mapServerPostToClient);
};

export const createPost = async (postBody) => {
  const res = await fetch(`${API_BASE}/api/trade/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(postBody),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to create post');
  }
  const data = await res.json();
  // controller returns { message, post }
  return mapServerPostToClient(data.post);
};

export const fetchUserPosts = async () => {
  const res = await fetch(`${API_BASE}/api/trade/posts/user`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch user posts');
  const data = await res.json();
  return data.posts.map(mapServerPostToClient);
};

export const deletePost = async (id) => {
  const res = await fetch(`${API_BASE}/api/trade/posts/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to delete post');
  }
  return true;
};

export const createRequest = async ({ postId, message }) => {
  const res = await fetch(`${API_BASE}/api/trade/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ postId, message }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to create request');
  }
  const data = await res.json();
  return data.request;
};

export const fetchIncomingRequests = async (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/api/trade/requests/incoming${qs ? `?${qs}` : ''}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch incoming requests');
  const data = await res.json();
  return data;
};

export const fetchOutgoingRequests = async () => {
  const res = await fetch(`${API_BASE}/api/trade/requests/outgoing`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch outgoing requests');
  const data = await res.json();
  return data.requests;
};

export const fetchRequestCount = async () => {
  const res = await fetch(`${API_BASE}/api/trade/requests/count`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch request count');
  return res.json();
};

export const acceptRequest = async (id) => {
  const res = await fetch(`${API_BASE}/api/trade/requests/${id}/accept`, { method: 'PATCH', credentials: 'include' });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    const msg = errBody && errBody.message ? errBody.message : `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  return res.json();
};

export const declineRequest = async (id) => {
  const res = await fetch(`${API_BASE}/api/trade/requests/${id}/decline`, { method: 'PATCH', credentials: 'include' });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    const msg = errBody && errBody.message ? errBody.message : `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  return res.json();
};

export default { fetchPosts, createPost, fetchUserPosts, deletePost };
