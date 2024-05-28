import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { handleGetCredentials } from "../../../services/api/tutorApi";
import { useParams } from "react-router-dom";

const InstVideoCall: React.FC = () => {
  const [appID, setAppID] = useState<number | null>(null);
  const [serverSecret, setServerSecret] = useState<string | null>(null);
  const { roomId } = useParams<{ roomId: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const zpRef = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const getCredentials = async () => {
    const response = await handleGetCredentials();

    if (response?.data.success) {
      const id = Number(response.data.appID);
      console.log(id);

      setAppID(id);
      setServerSecret(response.data.serverSecret);
    }
  };

  useEffect(() => {
    getCredentials();
  }, []);

  const handleStartCall = () => {
    if (roomId && appID !== null && serverSecret !== null) {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        "Arun"
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zpRef.current = zp;

      if (zpRef.current && containerRef.current) {
        zpRef.current.joinRoom({
          container: containerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
        });
      }

      setIsInitialized(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-center mt-8 mb-8">
      {!isInitialized && (
        <button
          onClick={handleStartCall}
          className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors"
        >
          Enter Call
        </button>
      )}
      <div
        ref={containerRef}
        className="w-[100vw] h-[70vh] max-w-4xl mt-4 overflow-hidden"
      />
    </div>
  );
};

export default InstVideoCall;
