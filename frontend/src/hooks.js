/* oxlint-disable react-hooks/exhaustive-deps -- the fn callback is intentionally stable and omitted from deps */
import { useEffect, useState } from 'react';
import { api } from './api.js';

// Generic async-data hook: fetches once on mount, returns { data, loading, error }.
export function useAsync(fn) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let active = true;
    setState((s) => ({ ...s, loading: true }));
    fn()
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((error) => active && setState({ data: null, loading: false, error }));
    return () => {
      active = false;
    };
  }, []);

  return state;
}

// Loads the page copy for a slug, merged over the provided design defaults.
// Returns the defaults immediately so the page renders before the API answers.
export function usePageContent(slug, defaults) {
  const { data } = useAsync(() => api.getPages());
  const page = Array.isArray(data) ? data.find((p) => p.slug === slug) : null;
  return {
    eyebrow: page?.hero_eyebrow || defaults.eyebrow,
    headline: page?.hero_headline || defaults.headline,
    body: page?.hero_body || defaults.body,
  };
}
