import PlayerComponent from "@/components/Player";
import { useLesson } from "@/pages/lesson/state";

/** player section */
const Player = () => {
  /** use lesson state */
  const playerRef = useLesson("playerRef");
  const video = useLesson("video");

  if (!video) return <div className="placeholder">No video loaded</div>;

  return <PlayerComponent ref={playerRef} video={video} />;
};

export default Player;
