import { useEffect, useState } from "preact/hooks";
import { verifyToken } from "./services";

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const vt = async () => {
      const res = await verifyToken();
      setIsAuth(!!res);
    };
    vt();
  }, []);
  return { isAuth };
}
