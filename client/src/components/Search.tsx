interface Props {
  handleSearch: Function;
}

function Search(props: Props) {
  return (
    <div className="d-flex" role="search">
      <input
        type="text"
        onChange={(e) => {
          props.handleSearch(e.target.value);
        }}
        className="form-control"
        placeholder="Enter an album name.."
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
      <button className="btn btn-outline-warning" type="submit">
        Search
      </button>
    </div>
  );
}

export default Search;
