import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (movies === null) return;
  return (
    <div className="px-6 ">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-auto no-scrollbar space-x-4">
        <div className="flex">
          {movies.map((movies) => (
            <MovieCard key={movies.id} posterUrl={movies?.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
