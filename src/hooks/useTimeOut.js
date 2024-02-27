import { useEffect, useState } from "react";

export const useTimeOut = (time, status) => {
    const [loading, setLoading] = useState(false);

    setTimeout(() => {
      setLoading(false)
    }, time)

    return loading;
    
}