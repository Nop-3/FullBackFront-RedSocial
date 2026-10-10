import { useEffect, useState } from 'react';
import { searchUsers } from '../utils/userSearch';

export default function useUserSearch(query) {
  const [state, setState] = useState({ users: [], loading: false, error: '' });

  useEffect(() => {
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      setState({ users: [], loading: false, error: '' });
      return undefined;
    }

    const controller = new AbortController();
    setState({ users: [], loading: true, error: '' });
    const timer = window.setTimeout(() => {
      searchUsers(cleanQuery, controller.signal)
        .then(users => setState({ users, loading: false, error: '' }))
        .catch(error => {
          if (error.name !== 'AbortError') {
            setState({ users: [], loading: false, error: error.message });
          }
        });
    }, 200);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return state;
}
