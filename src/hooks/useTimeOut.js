import { useEffect, useState } from "react";

export const useTimeOut = (time) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, time);
    }, [time]);

    return loading;
    
}