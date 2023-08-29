import { useEffect, useRef } from "react";

export function useOutsideClick(fnHandler) {
  const ref = useRef();
  useEffect(() => {
    function clickHandler(e) {
      console.log(e.target, 1);
      // check ref (generally modal self) if not clicked to it then close modal
      if (ref.current && !ref.current.contains(e.target)) {
        // generally closeModal function
        fnHandler();
      }
    }
    function clickHandler2(e) {
      console.log(e.target, 2);
      // check ref (generally modal self) if not clicked to it then close modal
      if (ref.current && !ref.current.contains(e.target)) {
        // generally closeModal function
        fnHandler();
      }
    }
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler2, true);
  }, []);
  return ref;
}
