import { useEffect, useState } from "react";
import Search from "../components/Search";
import Title from "../components/Title";
import { TCollection, TRecord } from "../pages/types";
import { getRequest } from "../services/api";

function Collection() {
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
            <div key={key} className="col-md-3 p-3 me-2 border border-dark">
              <img
                className="img-fluid m-2"
                src={record.basic_information.cover_image}
                alt="cover"
                height="200px"
                width="200px"
              />
              <h6 className="card-text m-2">
                {record.basic_information.artists[0].name} -{" "}
                {record.basic_information.title}
              </h6>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Collection;
