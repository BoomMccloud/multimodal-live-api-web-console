/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import cn from "classnames";

import { memo, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import { UseMediaStreamResult } from "../../hooks/use-media-stream-mux";
import { useScreenCapture } from "../../hooks/use-screen-capture";
import { useWebcam } from "../../hooks/use-webcam";
import { AudioRecorder } from "../../lib/audio-recorder";
import AudioPulse from "../audio-pulse/AudioPulse";
import { Box, IconButton, Paper, styled, useTheme, Tooltip } from "@mui/material";
import { Mic, MicOff, Videocam, VideocamOff, PresentToAll, CancelPresentation, PlayArrow, Pause, LightMode, DarkMode } from "@mui/icons-material";
import { useTheme as useCustomTheme } from "../../contexts/ThemeContext";

export type ControlTrayProps = {
  videoRef: RefObject<HTMLVideoElement>;
  children?: ReactNode;
  supportsVideo: boolean;
  onVideoStreamChange?: (stream: MediaStream | null) => void;
};

type MediaStreamButtonProps = {
  isStreaming: boolean;
  onIcon: ReactNode;
  offIcon: ReactNode;
  start: () => Promise<any>;
  stop: () => any;
};

const StyledControlTray = styled('section')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, 0)',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  paddingBottom: theme.spacing(2),
}));

const StyledActionNav = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 27,
  border: `1px solid ${theme.palette.divider}`,
  display: 'inline-flex',
  gap: theme.spacing(1.5),
  alignItems: 'center',
  padding: theme.spacing(1.25),
  transition: 'all 0.6s ease-in',
  '&.disabled': {
    opacity: 0.7,
    pointerEvents: 'none',
  }
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: 18,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  '&.mic-button': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  '&.connect-button': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&.connected': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
      },
    }
  }
}));

const ConnectionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  '.connection-button-container': {
    borderRadius: 27,
    border: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.paper,
    padding: theme.spacing(1.25),
  },
  '.text-indicator': {
    fontSize: 11,
    color: theme.palette.primary.main,
    userSelect: 'none',
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
  },
  '&.connected .text-indicator': {
    opacity: 1,
  }
}));

/**
 * button used for triggering webcam or screen-capture
 */
const MediaStreamButton = memo(
  ({ isStreaming, onIcon, offIcon, start, stop }: MediaStreamButtonProps) => (
    <StyledIconButton
      onClick={isStreaming ? stop : start}
    >
      {isStreaming ? onIcon : offIcon}
    </StyledIconButton>
  ),
);

function ControlTray({
  videoRef,
  children,
  onVideoStreamChange = () => {},
  supportsVideo,
}: ControlTrayProps) {
  const { mode, toggleColorMode } = useCustomTheme();
  const videoStreams = [useWebcam(), useScreenCapture()];
  const [activeVideoStream, setActiveVideoStream] =
    useState<MediaStream | null>(null);
  const [webcam, screenCapture] = videoStreams;
  const [inVolume, setInVolume] = useState(0);
  const [audioRecorder] = useState(() => new AudioRecorder());
  const [muted, setMuted] = useState(false);
  const renderCanvasRef = useRef<HTMLCanvasElement>(null);
  const connectButtonRef = useRef<HTMLButtonElement>(null);

  const { client, connected, connect, disconnect, volume } =
    useLiveAPIContext();

  useEffect(() => {
    if (!connected && connectButtonRef.current) {
      connectButtonRef.current.focus();
    }
  }, [connected]);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--volume",
      `${Math.max(5, Math.min(inVolume * 200, 8))}px`,
    );
  }, [inVolume]);

  useEffect(() => {
    const onData = (base64: string) => {
      client.sendRealtimeInput([
        {
          mimeType: "audio/pcm;rate=16000",
          data: base64,
        },
      ]);
    };
    if (connected && !muted && audioRecorder) {
      audioRecorder.on("data", onData).on("volume", setInVolume).start();
    } else {
      audioRecorder.stop();
    }
    return () => {
      audioRecorder.off("data", onData).off("volume", setInVolume);
    };
  }, [connected, client, muted, audioRecorder]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = activeVideoStream;
    }

    let timeoutId = -1;

    function sendVideoFrame() {
      const video = videoRef.current;
      const canvas = renderCanvasRef.current;

      if (!video || !canvas) {
        return;
      }

      const ctx = canvas.getContext("2d")!;
      canvas.width = video.videoWidth * 0.25;
      canvas.height = video.videoHeight * 0.25;
      if (canvas.width + canvas.height > 0) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL("image/jpeg", 1.0);
        const data = base64.slice(base64.indexOf(",") + 1, Infinity);
        client.sendRealtimeInput([{ mimeType: "image/jpeg", data }]);
      }
      if (connected) {
        timeoutId = window.setTimeout(sendVideoFrame, 1000 / 0.5);
      }
    }
    if (connected && activeVideoStream !== null) {
      requestAnimationFrame(sendVideoFrame);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [connected, activeVideoStream, client, videoRef]);

  //handler for swapping from one video-stream to the next
  const changeStreams = (next?: UseMediaStreamResult) => async () => {
    if (next) {
      const mediaStream = await next.start();
      setActiveVideoStream(mediaStream);
      onVideoStreamChange(mediaStream);
    } else {
      setActiveVideoStream(null);
      onVideoStreamChange(null);
    }

    videoStreams.filter((msr) => msr !== next).forEach((msr) => msr.stop());
  };

  return (
    <StyledControlTray>
      <canvas style={{ display: "none" }} ref={renderCanvasRef} />
      <StyledActionNav className={cn({ disabled: !connected })}>
        <StyledIconButton
          className="mic-button"
          onClick={() => setMuted(!muted)}
        >
          {!muted ? <Mic /> : <MicOff />}
        </StyledIconButton>

        <Box className="audio-pulse-container">
          <AudioPulse volume={volume} active={connected} hover={false} />
        </Box>

        {supportsVideo && (
          <>
            <MediaStreamButton
              isStreaming={screenCapture.isStreaming}
              start={changeStreams(screenCapture)}
              stop={changeStreams()}
              onIcon={<CancelPresentation />}
              offIcon={<PresentToAll />}
            />
            <MediaStreamButton
              isStreaming={webcam.isStreaming}
              start={changeStreams(webcam)}
              stop={changeStreams()}
              onIcon={<VideocamOff />}
              offIcon={<Videocam />}
            />
          </>
        )}
        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
          <StyledIconButton onClick={toggleColorMode}>
            {mode === 'light' ? <DarkMode /> : <LightMode />}
          </StyledIconButton>
        </Tooltip>
        {children}
      </StyledActionNav>

      <ConnectionContainer className={cn({ connected })}>
        <Box className="connection-button-container">
          <StyledIconButton
            ref={connectButtonRef}
            className={cn("connect-button", { connected })}
            onClick={connected ? disconnect : connect}
          >
            {connected ? <Pause /> : <PlayArrow />}
          </StyledIconButton>
        </Box>
        <Box component="span" className="text-indicator">
          Streaming
        </Box>
      </ConnectionContainer>
    </StyledControlTray>
  );
}

export default memo(ControlTray);
