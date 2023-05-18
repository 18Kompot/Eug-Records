import { useContext, useEffect, useState } from "react";
import { renderToString } from "react-dom/server";

import { getRequest, postRequest } from "../services/api";
import { toast } from "react-toastify";
import { AppContext } from "../App";
import React from "react";

interface IEditableProps {
  children?: React.ReactNode;
  name: string;
}

export default function Editable(props: IEditableProps) {
  const context = useContext(AppContext);
  const admin = context && context.isAdmin;

  // The server is asked for the page's content. When the server returns 404,
  // meaning the page doesn't exist in the database, then the default HTML is
  // used and wasEdited (this state) remains false.
  const [wasEdited, setWasEdited] = useState<boolean>(false);

  // Indicates whether or not the user is currently editing the page.
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // The current edit, unsaved. When the user clicks "cancel" while editing, the
  // changes will be discarded. When the user clicks "save", the string in this
  // state will overwrite the "content" state.
  const [editContent, setEditContent] = useState<string>("");

  // The current content of the page.
  const [content, setContent] = useState<string>("");

  // This effect is executed when the page loads. We request the page's content
  // from the server.
  useEffect(() => {
    const res = getRequest(`pages/${props.name}`, false);
    if (!res) {
      return;
    }

    res.then(async (response) => {
      if (!response.ok) {
        return;
      }

      const json: any = await response.json();
      if (!json) {
        return;
      }

      const hasData = json.error === undefined;

      setWasEdited(hasData);
      setContent(hasData ? json.content : getEditValue());
    });
  }, []);

  function toggleEdit() {
    setEditContent(content);
    setIsEditing(!isEditing);
  }

  function saveContent() {
    const res = postRequest(
      `pages/edit/${props.name}`,
      { content: editContent },
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

      toast.success(`You made adjustments to the ${props.name} page`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      setIsEditing(false);
      setEditContent("");
      setContent(editContent);
    });
  }

  function onContentChanged(text: string) {
    setEditContent(text);
  }

  function getEditValue(): string {
    if (wasEdited) {
      return content;
    }

    if (!wasEdited && !props.children) {
      return "";
    }

    // Turn props.children, which has the "ReactNode" type, into a bunch of
    // JSXElement objects. We can turn JSXElement objects into a string. We
    // can't turn ReactNode objects into strings.
    return renderToString(
      React.createElement(React.Fragment, null, props.children)
    );
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
                value={editContent}
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
