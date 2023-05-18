import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../services/api";
import { TFormat, TIdentifier, TLabel, TRecord, TTrack } from "./types";

function Recordinfo() {
  const { id } = useParams();

  const [record, setRecord] = useState<TRecord>();

  // const [error, setError] = useState<string>("");

  useEffect(() => {
    const res = getRequest(`records/${id}`);
    if (!res) return;

    res
      .then((response) => response.json())
      .then((json: any) => {
        setRecord({
          id: json.id,
          date_added: "",
          basic_information: json,
        });
      });
  }, [id]);

  function getLabels(labels: TLabel[]) {
    if (labels.length < 1) {
      return "";
    }
    let names = " ";
    labels.forEach((label: TLabel, index: number) => {
      if (index !== 0) {
        names += ", ";
      }
      names += `${label.name}`;
    });
    return names;
  }

  function getFormats(formats: TFormat[]) {
    if (formats.length < 1) {
      return "";
    }
    let names = " ";
    formats.forEach((format: TFormat, index: number) => {
      if (index !== 0) {
        names += ", ";
      }
      names += `${format.name}`;
    });
    return names;
  }

  function getIdentifier(ids: TIdentifier[]) {
    if (ids.length < 1) {
      return "";
    }
    let names = " ";
    ids.forEach((id: TIdentifier, index: number) => {
      if (id.type !== "Barcode") {
        return;
      }
      if (index !== 0) {
        names += ", ";
      }
      names += `${id.value}`;
    });
    return names;
  }

  function getTracks(tracks: TTrack[]) {
    if (tracks.length < 1) {
      return null;
    }
    return (
      <ul>
        {tracks.map((track: TTrack) => (
          <li key={track.position}>
            {track.position}: {track.title}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <div className="p-4 container">
        <div className="card bg-light">
          <div className="card-body">
            <h6>{record?.basic_information.title}</h6>
            <img
              src={record?.basic_information.cover_image}
              alt="cover"
              height="200px"
              width="200px"
            />
            <p>
              <b>Artist:</b> {record?.basic_information.artists_sort}
              <br />
              <b>Released:</b> {record?.basic_information.year}
            </p>
            <hr></hr>
            <div>
              <b>Format:</b>{" "}
              {getFormats(record?.basic_information.formats ?? [])}
              <br />
              <b>Label:</b> {getLabels(record?.basic_information.labels ?? [])}
              <br />
              <b>Genre:</b> {record?.basic_information.genres}
              <br />
              <b>Press Region:</b> {record?.basic_information.country}
              <br />
              <b>Catno:</b>{" "}
              {getIdentifier(record?.basic_information.identifiers ?? [])}
              <br />
              <b>Tracklist:</b>{" "}
              {getTracks(record?.basic_information.tracklist ?? [])}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recordinfo;
