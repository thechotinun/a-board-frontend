import { useEffect, useRef } from "react";
import io from "socket.io-client";

export function useSocket(postId, token) {
  const socket = useRef();

  useEffect(() => {
    socket.current = io(`${process.env.NEXT_PUBLIC_API_URL}/socket-post`, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    socket.current.emit("joinPost", { postId });

    return () => {
      socket.current?.emit("leavePost", { postId });
      socket.current?.disconnect();
    };
  }, [postId, token]);

  return socket.current;
}
