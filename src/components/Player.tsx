import { useImperativeHandle, useRef, type Ref } from "react";
import YouTube, { type YouTubePlayer } from "react-youtube";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";
import classes from "./Player.module.css";

type Props = {
  ref?: Ref<PlayerRef>;
  /** video id */
  video: string;
};

export type PlayerRef = {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  seek: (time: number) => Promise<void>;
  volume: (volume: number) => Promise<void>;
};

/** video player */
const Player = ({ ref, video }: Props) => {
  const playerRef = useRef<YouTubePlayer>(null);

  /** expose methods */
  useImperativeHandle(
    ref,
    () => ({
      /** control methods */
      play: async () => await playerRef.current?.playVideo(),
      pause: async () => await playerRef.current?.pauseVideo(),
      seek: async (time: number) => {
        if (!playerRef.current) return;
        await playerRef.current.seekTo(time, true);
        if (
          (await playerRef.current?.getPlayerState()) === PlayerStates.PLAYING
        )
          await playerRef.current?.playVideo();
        else await playerRef.current?.pauseVideo();
      },
      volume: async (volume: number) => playerRef.current?.setVolume(volume),
    }),
    [],
  );

  return (
    <YouTube
      videoId={video}
      onReady={async (event) => {
        playerRef.current = event.target;
        await playerRef.current?.mute();
      }}
      className={classes.container}
      iframeClassName={classes.iframe}
    />
  );
};

export default Player;
