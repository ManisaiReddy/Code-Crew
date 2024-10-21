import { useEffect, useState } from "react";
import { getPosts } from "../services/api";

export const usePosts = (username = null) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts(username);
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [username]);

  return { posts, loading, error };
};