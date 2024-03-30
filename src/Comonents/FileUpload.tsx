import React, { Component, ChangeEvent } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';

import UploadService from './Services/upload-files';

interface FileData {
  name: string;
  url: string;
}

interface UploadFilesState {
  selectedFiles: File[];
  currentFile: File | undefined;
  progress: number;
  message: string;
  fileInfos: FileData[];
}

export default class UploadFiles extends Component<{}, UploadFilesState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedFiles: [],
      currentFile: undefined,
      progress: 0,
      message: '',
      fileInfos: [],
    };
  }

  componentDidMount() {
    UploadService.getFiles().then((response: { data: any; }) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  upload = () => {
    const { selectedFiles } = this.state;
    const currentFile = selectedFiles[0];

    if (!currentFile) return;

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event: { loaded: number; total: number; }) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response: { data: { message: any; }; }) => {
        this.setState({
          message: response.data.message,
        });
        return UploadService.getFiles();
      })
      .then((files: { data: any; }) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: 'Could not upload the file!',
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: [],
    });
  };

  onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (acceptedFiles.length > 0) {
      this.setState({ selectedFiles: acceptedFiles });
    }
  };

  render() {
    const { selectedFiles, currentFile, progress, message, fileInfos } =
      this.state;

    return (
      <div>
        {currentFile && (
          <div className="progress mb-3">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        )}

        <Dropzone onDrop={this.onDrop} multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {selectedFiles.length > 0 ? (
                  <div className="selected-file">
                    {selectedFiles[0].name}
                  </div>
                ) : (
                  'Drag and drop file here, or click to select file'
                )}
              </div>
              <aside className="selected-file-wrapper">
                <button
                  className="btn btn-success"
                  disabled={selectedFiles.length === 0}
                  onClick={this.upload}
                >
                  Upload
                </button>
              </aside>
            </section>
          )}
        </Dropzone>

        <div className="alert alert-light" role="alert">
          {message}
        </div>

        {fileInfos.length > 0 && (
          <div className="card">
            <div className="card-header">List of Files</div>
            <ul className="list-group list-group-flush">
              {fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
