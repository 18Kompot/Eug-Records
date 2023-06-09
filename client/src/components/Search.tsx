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
        placeholder="Enter an album or an artist name.."
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
}

export default Search;
