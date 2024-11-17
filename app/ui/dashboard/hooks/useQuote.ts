import { useEffect, useMemo, useState } from 'react';
type quoteResolved = {
  response: object;
};

export const useQuote = (): quoteResolved => {
  const [response, setResponse] = useState({});
  const [dependency, setDependency] = useState(0);

  const quote = useMemo(() => async () => {}, [dependency]);

  useEffect(() => {
    quote();
  }, []);

  return {
    response,
  };
};
