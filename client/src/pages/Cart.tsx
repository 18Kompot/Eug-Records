import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import { TRecord } from "./types";
import { useState } from "react";
import { AppContext } from "../App";

function Cart() {
  const [records, setRecords] = useState<TRecord[]>([]);
  const appContext = useContext(AppContext);

  useEffect(() => {
    setRecords(appContext?.cartRecords ?? []);
  }, [appContext?.cartRecords]);

  return (
    <>
      {records.length > 0 ? (
        <Title main={<>Cart items</>} sub={<></>} />
      ) : (
        <Title main={<>Cart is empty</>} sub={<></>} />
      )}

      <div className="container">
        <div className="row d-flex justify-content-center m-3 text-center g-5">
          {records.map((record, key) => (
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
                  onClick={(_) => appContext?.handleRemoveRecord(record)}
                  className="btn btn-danger text-white m-1"
                >
                  <span className="px-1 text-white bi-trash"></span>
                </button>

                <Link
                  to={`/info/${record.id}`}
                  className="btn btn-light border-dark text-white m-1"
                >
                  <span className="px-1 text-dark bi-info-circle"></span>
                </Link>

                <Link
                  target="_blank"
                  to={`https://www.discogs.com/sell/release/${record.id}`}
                  className="btn btn-info border-dark text-white m-1"
                >
                  <span className="px-1 text-dark bi-currency-dollar"></span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cart;
