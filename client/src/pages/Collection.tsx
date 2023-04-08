import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import Search from "../components/Search";
import Title from "../components/Title";
import { TCollection, TRecord } from "../pages/types";
import { getRequest } from "../services/api";
import { AppContext } from "../App";

function Collection() {
  const appContext = useContext(AppContext);
  const [record, setRecord] = useState<TRecord[]>([]);
  const [shownRecords, setShownRecords] = useState<Array<TRecord>>([]);

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
  }

  useEffect(() => {
    return () => {
      console.log("useEffect");
      getRelease();
    };
  }, []);

  return (
    <>
      <Title main={<>My record collection</>} sub={<></>} />

      <div className="container">
        <Search handleSearch={handleSearch} />
        <div className="row d-flex justify-content-center m-3 text-center g-5">
          {shownRecords.map((record, key) => (
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
                  onClick={(_) => appContext?.handleAddRecordId(record.id)}
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
        </div>
      </div>
    </>
  );
}

export default Collection;
