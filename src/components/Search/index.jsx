import "./search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Search({ search, setSearch, text }) {
  return (
    <div className="search-bar">
      <FontAwesomeIcon className="search-icon" icon="magnifying-glass" />
      <input
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        className="search-input"
        type="text"
        placeholder={text}
        value={search}
      />
    </div>
  );
}

export default Search;
