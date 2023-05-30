import React from 'react';

const ProfilePage = () => {
  const user = {
    name: "John Doe",
    bio: "I'm a software engineer who loves building things with code.",
    avatarUrl: "https://example.com/avatar.jpg",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    website: "https://johndoe.com",
    social: {
      twitter: "https://twitter.com/johndoe",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe"
    }
  };

  return (
    <div>
      <h1>{user.name}</h1>
      <img src={user.avatarUrl} alt="Profile Picture" />
      <p>{user.bio}</p>
      <ul>
        <li>Email: {user.email}</li>
        <li>Location: {user.location}</li>
        <li>Website: <a href={user.website}>{user.website}</a></li>
        <li>Social:
          <ul>
            <li><a href={user.social.twitter}>Twitter</a></li>
            <li><a href={user.social.github}>GitHub</a></li>
            <li><a href={user.social.linkedin}>LinkedIn</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ProfilePage;
