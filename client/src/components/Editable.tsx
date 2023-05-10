import { useContext, useEffect, useState } from "react";
import { getRequest, postRequest } from "../services/api";
import { toast } from "react-toastify";
import { AppContext } from "../App";

interface IEditableProps {
  name: string;
}

export default function Editable(props: IEditableProps) {
  const context = useContext(AppContext);
  const admin = context && context.isAdmin;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const res = getRequest(`pages/${props.name}`);
    if (!res) {
      return;
    }

    res
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then((json: { content: string }) => {
        setContent(json.content);
      });
  }, []);

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  function saveContent() {
    const res = postRequest(
      `pages/edit/${props.name}`,
      { content: content },
      false
    );
    if (!res) {
      toast.error("Failed to update page.");
      return;
    }

    res.then((response) => {
      if (!response.ok) {
        toast.error("Failed to update page.");
        return;
      }

      toast.success(`Page ${props.name} updated!`);
      setIsEditing(false);
    });
  }

  function onContentChanged(text: string) {
    setContent(text);
  }

  return (
    <>
      <div className="container-fluid m-4">
        {!isEditing ? (
          <>
            {admin && (
              <div className="d-flex flex-row justify-content-end">
                <button onClick={toggleEdit} className="btn btn-outline-light">
                  <i className="bi bi-pencil-fill"></i>
                </button>
              </div>
            )}

            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </>
        ) : (
          <div>
            <div className="row" style={{ height: "500px" }}>
              <textarea
                onChange={(e) => onContentChanged(e.target.value)}
                value={content}
              />
            </div>

            <div className="row">
              <div className="d-flex flex-col justify-content-end">
                <button onClick={toggleEdit} className="btn btn-danger me-2">
                  Cancel
                </button>
                <button onClick={saveContent} className="btn btn-success">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
