import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [genre, setGenre] = useState("all");

  useEffect(() => {
    fetch("https://0a6b11a721225cc4.mokky.dev/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  const genres = ["all", ...new Set(movies.map((movie) => movie.genre))];

  const filteredMovies = [...movies]
    .filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((movie) =>
      genre === "all" ? true : movie.genre === genre
    )
    .sort((a, b) => {
      if (sort === "high") return b.rating - a.rating;

      if (sort === "low") return a.rating - b.rating;

      return 0;
    });

  return (
    <div className="container">
      <h1>Список фильмов</h1>

      <input
        type="text"
        placeholder="Поиск фильма"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Без сортировки</option>
        <option value="high">Рейтинг (по убыванию)</option>
        <option value="low">Рейтинг (по возрастанию)</option>
      </select>

      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        {genres.map((item) => (
          <option key={item} value={item}>
            {item === "all"
              ? "Все жанры"
              : item}
          </option>
        ))}
      </select>

      <div className="movies">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              className="card"
              key={movie.id}
            >
              <h2>{movie.title}</h2>

              <p>
                Жанр: {movie.genre}
              </p>

              <p>
                Рейтинг: {movie.rating}
              </p>
            </div>
          ))
        ) : (
          <p className="empty">
            Ничего не найдено 
          </p>
        )}
      </div>
    </div>
  );
}

export default App;