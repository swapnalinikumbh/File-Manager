import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import "./styles.css";

const FileItem = ({ name, isFolder, onDelete }) => {
  return (
    <div>
      {isFolder ? (
        <span>📁</span>
      ) : (
        <span>📄</span>
      )}
      {name}
      {!isFolder && <button onClick={onDelete}>Delete</button>}
    </div>
  );
};

const FileManager = () => {
  const [currentFolder, setCurrentFolder] = useState('root');
  const [files, setFiles] = useState([
    { id: uuidv4(), name: 'Document1.txt', isFolder: false },
    { id: uuidv4(), name: 'Document2.txt', isFolder: false },
    { id: uuidv4(), name: 'Folder1', isFolder: true },
    { id: uuidv4(), name: 'Folder2', isFolder: true },
  ]);

  const handleFolderClick = (folderName) => {
    setCurrentFolder(folderName);
  };

  const handleDeleteFile = (fileId) => {
    setFiles(files.filter((file) => file.id !== fileId));
  };

  const handleFileDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: uuidv4(),
      name: file.name,
      isFolder: false,
    }));
    setFiles([...files, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileDrop,
  });

  return (
    <div className="file-item">
      <h2>File Manager</h2>
      <div>
        {currentFolder !== 'root' && (
          <div onClick={() => handleFolderClick('root')}>
            🠔 Back to Root
          </div>
        )}
        <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', marginBottom: '20px' }}>
          <input {...getInputProps()} />
          Drag and drop files here, or click to select files
        </div>
        {files.map((file) => (
          <FileItem
            key={file.id}
            name={file.name}
            isFolder={file.isFolder}
            onDelete={() => handleDeleteFile(file.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FileManager;
