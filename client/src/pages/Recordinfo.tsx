import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../services/api";

function Recordinfo() {
  const { id } = useParams();

  const [record, setRecord] = useState<any>();

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

  //   function getTrackArtists(track: any) {
  //     if (!track) {
  //       return "";
  //     }
  //     let names = " ";
  //     track.extraartists.forEach((artist: any, index: number) => {
  //       if (index !== 0) {
  //         names += ", ";
  //       }
  //       names += `${artist.name}`;
  //     });
  //     return names;
  //   }

  return (
    <>
      <div className="row align-items-center">
        <div className="col">
          <div className="card-body col-sm-10">
            <p className="card-text">
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing
            </p>
          </div>
        </div>
        <div className="card col-sm-4">
          <div className="card-body">
            <h6>{record?.title}</h6>
            <p className="card-text">{record?.year}</p>
            <hr></hr>
            <b>Tel:</b> {record?.genres}
            <br />
            <b>Address:</b> {}
            <br />
            <b>Card Number:</b> {}
          </div>
        </div>
      </div>
    </>
  );
}

export default Recordinfo;
