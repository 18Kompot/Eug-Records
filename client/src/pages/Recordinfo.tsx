import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../services/api";
import { InfoData, TFormat, TIdentifier, TLabel, TTrack } from "./types";

function Recordinfo() {
  const { id } = useParams();

  const [record, setRecord] = useState<InfoData>();

  // const [error, setError] = useState<string>("");

  useEffect(() => {
    const res = getRequest(`records/${id}`);
    if (!res) return;

    res
      .then((response) => response.json())
      .then((json: any) => {
        setRecord(json);
      });
  }, [id]);

  //   function findTrack(record: any) {
  //     if (record === undefined) return undefined;
  //     for (let i = 0; i < record.tracklist.length; i++) {
  //       let track = record.tracklist[i];
  //       if (track.position === "A3") {
  //         return track;
  //       }
  //     }
  //     return undefined;
  //   }

  // function getTrackArtists(track: any) {
  //   if (!track) {
  //     return "";
  //   }
  //   let names = " ";
  //   track.extraartists.forEach((artist: any, index: number) => {
  //     if (index !== 0) {
  //       names += ", ";
  //     }
  //     names += `${artist.name}`;
  //   });
  //   return names;
  // }

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
      return "";
    }
    let names = " ";
    tracks.forEach((track: TTrack, index: number) => {
      if (index !== 0) {
        names += ", ";
      }
      names += `${track.position}: ${track.title}`;
    });
    return names;
  }

  return (
    <>
      <div className="vh-100 p-4 container d-flex justify-content-center align-items-center">
        <div className="card h-100">
          <div className="card-body">
            <h6>{record?.title}</h6>
            <p className="card-text">
              <b>Artist:</b> {record?.artists_sort}
              <br />
              <b>Released:</b> {record?.released_formatted}
            </p>
            <hr></hr>
            <div>
              <b>Format:</b> {getFormats(record?.formats ?? [])}
              <br />
              <b>Label:</b> {getLabels(record?.labels ?? [])}
              <br />
              <b>Genre:</b> {record?.genres}
              <br />
              <b>Press Region:</b> {record?.country}
              <br />
              <b>Catno:</b> {getIdentifier(record?.identifiers ?? [])}
              <br />
              <b>Tracklist:</b> {getTracks(record?.tracklist ?? [])}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recordinfo;
