import { useEffect, useRef } from "react";

export function useOutsideClick(fnHandler) {
  const ref = useRef();
  useEffect(() => {
    function clickHandler(e) {
      // check ref (generally modal self) if not clicked to it then close modal
      if (ref.current && !ref.current.contains(e.target)) {
        // generally closeModal function
        fnHandler();
      }
    }

    document.addEventListener("click", clickHandler, true);
    return () => document.removeEventListener("click", clickHandler, true);
  }, [ref]);
  return ref;
}
