import { useEffect, useRef } from "react";

function useOutsideClick(fnHandler) {
  const ref = useRef();

  useEffect(() => {
    function clickHandler(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        fnHandler();
      }
    }
    document.addEventListener("click", clickHandler, true);
    return () => document.removeEventListener("click", clickHandler, true);
  }, [ref]);
  return ref;
}

export default useOutsideClick;
