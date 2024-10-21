import { useEffect, useState } from "react";

// Dummy data
const dummyProfiles = {
  'johndoe': {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate developer and tech enthusiast.',
    skills: ['JavaScript', 'React', 'Node.js'],
    projects: ['Project A', 'Project B'],
  },
  'janedoe': {
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    bio: 'UX designer with a love for clean and intuitive interfaces.',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD'],
    projects: ['Design System X', 'App Redesign Y'],
  },
};

export const useProfile = (username) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = () => {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        if (dummyProfiles[username]) {
          setProfile(dummyProfiles[username]);
          setLoading(false);
        } else {
          setError(new Error('Profile not found'));
          setLoading(false);
        }
      }, 500); // 500ms delay to simulate network request
    };

    fetchProfile();
  }, [username]);

  return { profile, loading, error };
};