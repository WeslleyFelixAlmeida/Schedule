import { useEffect, useState } from "react";

type UseFetchProps = {
  apiUrl: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";
  body?: unknown;
};

const useFetch = <T>(props: UseFetchProps) => {
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T>();

  const fetchObj: RequestInit = {
    method: props.method,
    credentials: "include",
  };

  const fetchObjWithBody: RequestInit = {
    ...fetchObj,
    body: props.body !== undefined ? JSON.stringify(props.body) : undefined,
  };

  useEffect(() => {
    const callApi = async () => {
      try {
        setIsloading(true);
        setError(null);

        const result = await fetch(
          props.apiUrl,
          props.body !== undefined ? fetchObjWithBody : fetchObj
        );

        if (!result.ok) {
          throw new Error("Erro ao realizar requisição");
        }

        const data = await result.json();
        setData(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsloading(false);
      }
    };

    callApi();
  }, []);

  return { isLoading, data, error };
};

export default useFetch;
