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
      });
  }

  function handleSearch(input: string) {
    let resultRecords: Array<TRecord> = record;
    if (input !== "") {
      resultRecords = record.filter((data: TRecord) => {
        return record;
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
      <div className="bg-body-secondary">
        <div className="container">
          <div className="row row-cols-md-2 g-4 text-center m-3">
            {record.map((record, key) => (
              <div key={key} className="card-group">
                <div className="card bg-light bg-gradient">
                  <div className="card-body">
                    <img
                      src={record.basic_information.cover_image}
                      alt="cover"
                      height="150px"
                      width="150px"
                    />
                    <h5 className="card-title">
                      {record.basic_information.title}
                    </h5>
                    <h4 className="card-text">
                      {record.basic_information.artists[0].name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Collection;
