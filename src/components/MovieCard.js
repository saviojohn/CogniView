import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({posterUrl}) => {
  if(!posterUrl) return null;
  return (
    <div className="w-36 md:w-48 pr-4">
      <img src={IMG_CDN_URL+ posterUrl } alt="Movie Card" />
    </div>
  );
};

export default MovieCard;
