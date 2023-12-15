const useTraverseTree = () => {
  const insertNode = function (tree, folderId, item, isFolder) {
    console.log(folderId, tree.id, isFolder);
    if (folderId === tree.id && tree.isFolder) {
      console.log("kkdfsf");
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });

      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      console.log(ob);
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };
  const deleteNode = (tree, id) => {
    console.log("delete");
    tree.items = tree.items.filter((node) => {
      if (node.id === id) {
        return false;
      } else if (node.isFolder) {
        deleteNode(node, id);
        return true;
      } else {
        return true;
      }
    });
    console.log(tree);
    return tree;
  }; // Do it Yourself
  const renameNode = (tree, id, newName) => {
    tree.items.forEach((node) => {
      if (node.id === id) {
        node.name = newName;
      } else if (node.isFolder) {
        renameNode(node, id, newName);
      }
    });

    return tree;
  };
  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
