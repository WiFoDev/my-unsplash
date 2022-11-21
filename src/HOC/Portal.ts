import React, {FC, useEffect, useState} from "react";
import {createPortal} from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}
export const Portal: FC<PortalProps> = ({children}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        children,
        document.getElementById("my-portals") as HTMLElement,
      )
    : null;
};
