/*
	jsrepo 1.29.1
	Installed from https://reactbits.dev/default/
	1-27-2025
*/

import { useRef, useEffect } from "react";
import createBallpit from "./ballpit-utility";

const Ballpit = ({ className = "", followCursor = true, ...props }) => {
  const canvasRef = useRef(null);
  const spheresInstanceRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    spheresInstanceRef.current = createBallpit(canvas, {
      followCursor,
      ...props,
    });

    return () => {
      if (spheresInstanceRef.current) {
        spheresInstanceRef.current.dispose();
      }
    };
    // Dependencies intentionally left empty for single initialization
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      className={className}
      ref={canvasRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Ballpit;
