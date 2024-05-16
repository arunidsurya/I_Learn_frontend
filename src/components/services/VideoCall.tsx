import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoCall: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const zpRef = useRef<any>();

  useEffect(() => {
    if (roomId) {
      const initializeZego = async () => {
        const appID = 1952043939;
        const serverSecret = "33d341a12fe4818e6a874112e4a31b6a";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          Date.now().toString(),
          "Arun"
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zpRef.current = zp;
      };

      initializeZego();
    }
  }, [roomId]);

  useEffect(() => {
    if (roomId && zpRef.current && containerRef.current) {
      zpRef.current.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    }
  }, [roomId]);

  return (
    <div className=" flex justify-center items-center text-center mt-8 mb-8">
      <div ref={containerRef} className="w-[70%]" />
    </div>
  );
};

export default VideoCall;
