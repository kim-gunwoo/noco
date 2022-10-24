import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const Home: NextPage = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const getLocalVideo = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    if (!localVideoRef.current) return;
    localVideoRef.current.srcObject = mediaStream;
    // localVideoRef.current.play();
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
    </div>
  );
};

const LocalVideo = styled.video``;

export default Home;
