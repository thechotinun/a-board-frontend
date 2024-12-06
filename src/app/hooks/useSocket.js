import { useEffect, useRef } from "react";
import io from "socket.io-client";

export function useSocket(postId, token) {
  const socket = useRef();

  useEffect(() => {
    socket.current = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/v1/socket-post`, {
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
