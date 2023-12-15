import React, { useState } from "react";

const Folder = ({
  explorer,
  handleInsertNode,
  handleDeleteNode,
  handleUpdate,
}) => {
  const [expand, setExpand] = useState(false);
  const [update, setupdate] = useState(false);
  const [btndisplay, setbtndisplay] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });
  const [newname, setNewname] = useState("");
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
  const onDelete = (e) => {
    handleDeleteNode(explorer.id);
  };

  const onUpdate = (e) => {
    console.log(newname);
    if (e.keyCode === 13) {
      handleUpdate(explorer.id, newname);
      setupdate(false);
    }
  };
  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div
          className="folder"
          onClick={() => {
            setExpand(!expand);
          }}
          onMouseEnter={() => {
            setbtndisplay(true);
          }}
          onMouseLeave={() => {
            setbtndisplay(false);
          }}
        >
          {update ? (
            <span>
              📁
              <input
                type="text"
                autoFocus
                onBlur={() => {
                  setupdate(!update);
                }}
                onChange={(e) => {
                  setNewname(e.target.value);
                }}
                value={newname}
                onKeyDown={(e) => {
                  onUpdate(e);
                }}
              ></input>
            </span>
          ) : (
            <span className="file">📁 {explorer.name}</span>
          )}

          <div style={{ display: btndisplay ? "block" : "none" }}>
            <button
              onClick={(e) => {
                handleNewFolder(e, true);
              }}
            >
              {" "}
              Folder +
            </button>
            <button
              onClick={(e) => {
                handleNewFolder(e, false);
              }}
            >
              File +
            </button>
            <button
              onClick={(e) => {
                onDelete(e);
              }}
            >
              delete
            </button>
            <button
              onClick={() => {
                setNewname(explorer.name); // Set existing value when clicking "Rename"
                setupdate(true);
              }}
            >
              rename
            </button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                autoFocus
                className="inputContainer__input"
                onKeyDown={(e) => {
                  onAddFolder(e);
                }}
              />
            </div>
          )}

          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleUpdate={handleUpdate}
                explorer={exp}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div
        id="filesec"
        onMouseEnter={() => {
          setbtndisplay(true);
        }}
        onMouseLeave={() => {
          setbtndisplay(false);
        }}
      >
        {update ? (
          <span>
            📄
            <input
              type="text"
              autoFocus
              onBlur={() => {
                setupdate(!update);
              }}
              onChange={(e) => {
                setNewname(e.target.value);
              }}
              value={newname}
              onKeyDown={(e) => {
                onUpdate(e);
              }}
            ></input>
          </span>
        ) : (
          <span className="file">📄{explorer.name}</span>
        )}

        <div style={{ display: btndisplay ? "block" : "none" }}>
          <button
            onClick={(e) => {
              onDelete(e);
            }}
            className="filebtn"
          >
            delete
          </button>

          <button
            onClick={() => {
              setNewname(explorer.name); // Set existing value when clicking "Rename"
              setupdate(true);
            }}
            className="filebtn"
          >
            Rename
          </button>
        </div>
      </div>
    );
  }
};

export default Folder;
