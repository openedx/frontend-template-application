/* eslint-disable react/prop-types */
import { useState } from 'react';
import PopupDialog from '../popupDialog/PopupDialog';

const ImportFrameworkModal = ({
  isOpen,
  onClose,
  labels,
}) => {
  const [fileName, setFileName] = useState('');

  return (
    <PopupDialog
      isOpen={isOpen}
      title={labels.title}
      onClose={onClose}
      contentClassName="competency-framework-page__import-modal"
    >
      <p className="competency-framework-page__import-description">
        {labels.description}
      </p>

      <div className="competency-framework-page__import-body">
        <div className="competency-framework-page__import-field">
          <label className="competency-framework-page__import-label" htmlFor="framework-import-file">
            {labels.chooseFile}
          </label>
          <input
            id="framework-import-file"
            type="file"
            accept=".xlsx,.xls,.csv"
            className="competency-framework-page__import-input"
            onChange={(event) => setFileName(event.target.files?.[0]?.name || '')}
          />
          {fileName && (
            <p className="competency-framework-page__import-file-name">{fileName}</p>
          )}
        </div>
      </div>

      <div className="competency-framework-page__import-actions">
        <button type="button" className="competency-framework-page__outline-button" onClick={onClose}>
          {labels.cancel}
        </button>
        <button
          type="button"
          className="competency-framework-page__primary-button"
          onClick={onClose}
          disabled={!fileName}
        >
          {labels.import}
        </button>
      </div>
    </PopupDialog>
  );
};

export default ImportFrameworkModal;
