
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Title from "../components/Title";
import { TCollection, TRecord } from "../pages/types";
import { getRequest } from "../services/api";
import { AppContext } from "../App";
import { Pagination } from "react-bootstrap";

enum SortBy {
  None,
  DateAdded,
  Alphabetically
}

function Collection() {
  const appContext = useContext(AppContext);
  const [record, setRecord] = useState<TRecord[]>([]);
  const [shownRecords, setShownRecords] = useState<Array<TRecord>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter states
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.None);

  const itemsPerPage = 15;
  const totalPages = Math.ceil(shownRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecords = shownRecords.slice(startIndex, endIndex);

  function getRelease() {
    const res = getRequest("records");
    if (!res) return;

    res
      .then((response) => response.json())
      .then((json: TCollection) => {
        setRecord(json.releases);
        setShownRecords(json.releases);
      });
  }

  function applySort(sortBy: SortBy, inverse: boolean) {
    let sortedRecords: Array<TRecord> = [];

    // Deep copy the record array. We need to deep copy because .sort below 
    // alters the contents array.
    record.forEach((rec) => {
      sortedRecords.push(Object.assign({}, rec));
    });
    
    sortedRecords.sort((recordLeft: TRecord, recordRight: TRecord) => {
      let sortValue = 0;

      switch (sortBy) {
        case SortBy.None: {
          break;
        }

        case SortBy.Alphabetically: {
          const leftTitle = recordLeft.basic_information.title.toLowerCase();
          const rightTitle = recordRight.basic_information.title.toLowerCase();

          if (leftTitle !== rightTitle) {
            sortValue = leftTitle < rightTitle ? -1 : 1;
          }
          break;
        }

        case SortBy.DateAdded: {
          const leftDate = new Date(recordLeft.date_added);
          const rightDate = new Date(recordRight.date_added);

          if (recordLeft.date_added !== recordRight.date_added) {
            sortValue = leftDate < rightDate ? 1 : -1;
          }
          break;
        }
      }

      // Multiplying by a negative number inverses the sign.
      // 1 becomes -1, and -1 becomes 1. 0 remains 0
      if (inverse) sortValue *= -1;

      return sortValue;
    });

    setShownRecords(sortedRecords);
    setSortBy(sortBy);
  }

  function handleSearch(input: string) {
    let resultRecords: Array<TRecord> = record;
    if (input !== "") {
      resultRecords = record.filter((data: TRecord) => {
        let matchAltName = false;
        for (let i = 0; i < data.basic_information.artists.length; i++) {
          if (
            data.basic_information.artists[i].name
              .toLowerCase()
              .includes(input.toLowerCase())
          ) {
            matchAltName = true;
            break;
          }
        }
        return (
          data.basic_information.title
            .toLowerCase()
            .includes(input.toLowerCase()) || matchAltName
        );
      });
    }
    setShownRecords(resultRecords);
    setCurrentPage(1);
  }

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top of the page
  }

  useEffect(() => {
    getRelease();
  }, []);

  const items = [];
  for (let page = 1; page <= totalPages; page++) {
    items.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Title main={<>My record collection</>} sub={<></>} />
      <div className="container">
        <div className="d-flex flex-row justify-content-end mb-2">
          <button className="btn btn-outline-light me-2" onClick={ _ => applySort(SortBy.Alphabetically, false) }>
            <i className="bi bi-sort-alpha-down"></i>
          </button>

          <button className="btn btn-outline-light me-2" onClick={ _ => applySort(SortBy.Alphabetically, true) }>
            <i className="bi bi-sort-alpha-up"></i>
          </button>

          <button className="btn btn-outline-light me-2" onClick={ _ => applySort(SortBy.DateAdded, false) }>
            <i className="bi bi-sort-numeric-down"></i>
          </button>

          <button className="btn btn-outline-light" onClick={ _ => applySort(SortBy.DateAdded, true) }>
            <i className="bi bi-sort-numeric-up"></i>
          </button>
        </div>
        <Search handleSearch={handleSearch} />

        <div className="row d-flex justify-content-center p-4 text-center g-5">
          {currentRecords.map((record, key) => (
            <div
              key={key}
              className="d-flex rounded bg-light flex-column col-md-3 p-3 me-2 border border-dark"
            >
              <img
                className="img-fluid mx-auto"
                src={record.basic_information.cover_image}
                alt="cover"
                height="200px"
                width="200px"
              />

              <h6 className="card-text m-2 mb-auto py-2">
                {record.basic_information.artists[0].name} -{" "}
                {record.basic_information.title}
              </h6>

              <div className="d-flex align-items-center justify-content-center">
                <button
                  onClick={(_) => appContext?.handleAddRecord(record)}
                  className="btn btn-warning text-white m-1"
                >
                  <span className="px-1 text-dark bi-cart-plus"></span>
                </button>

                <Link
                  to={`/info/${record.id}`}
                  className="btn btn-light border-dark text-white m-1"
                >
                  <span className="px-1 text-dark bi-info-circle"></span>
                </Link>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-center">
            <Pagination>{items}</Pagination>
          </div>
        </div>
      </div>
    </>
  );
}

export default Collection;
