import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";

const configuration = {
  iceServers: [
    {
      urls: ["stun:tk-turn2.xirsys.com"],
    },
    {
      usernames: "DUCG",
      credential: "",
      urls: [],
    },
  ],
};

const Home: NextPage = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const roomIdRef = useRef("randomString");
  const pcRef = useRef(new RTCPeerConnection(configuration));
  const socketRef = useRef(null);

  const getLocalVideo = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    if (!localVideoRef.current) return;
    localVideoRef.current.srcObject = mediaStream;
    // localVideoRef.current.play();
  };

  const handleJoinBtn = () => {
    const socket = io("ws://localhost:8000");
    socketRef.current = socket;
  };

  useEffect(() => {
    if (localVideoRef.current) {
      localVideoRef.current.onloadedmetadata = () => {
        localVideoRef.current && localVideoRef.current.play();
      };
    }
  }, []);

  return (
    <div>
      <LocalVideo ref={localVideoRef} muted />
      <button onClick={getLocalVideo}>my camera</button>
      <button onClick={getLocalVideo}></button>
    </div>
  );
};

const LocalVideo = styled.video``;

export default Home;
