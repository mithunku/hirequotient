import React, { useState } from "react";
import explorer from "./data/folderdata";
import Folder from "./components/Folder";
import "./stylesheet.css";
import useTraverseTree from "./Hooks/use-traverse-tree";
const App = () => {
  const [explorerData, setexplorer] = useState(explorer);

  const { insertNode, deleteNode, renameNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    console.log(finalTree);
    setexplorer(finalTree);
  };

  const handleDeleteNode = (folderId) => {
    const finalTree = deleteNode(explorerData, folderId);
    setexplorer(finalTree);
  };
  const handleUpdate = (folderId, newname) => {
    const finalTree = renameNode(explorerData, folderId, newname);
    setexplorer(finalTree);
  };
  return (
    <div className="maincontent">
      <h1>FOLDER STRUCTURE USING REACT</h1>
      <Folder
        explorer={explorerData}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default App;
