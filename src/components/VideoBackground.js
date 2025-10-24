import { useSelector } from "react-redux";
import useDisplayTrailer from "../hooks/useDisplayTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  useDisplayTrailer({ movieId });

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?autoplay=1&mute=1&loop=1&playlist="+trailerVideo?.key+"&controls=0&rel=0&modestbranding=1&showinfo=0"
        }
        title="YouTube video player"
        allow="autoplay; encrypted-media"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
