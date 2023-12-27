import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfReader = () => {
  const [pdfPath, setPdfPath] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [selectedLine, setSelectedLine] = useState('');
  const [pdfError, setPdfError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfError(null);

    if (file) {
      setPdfPath(URL.createObjectURL(file));
      setPageNumber(1);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSelectedLine(value);
  };

  const handlePageLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
  };

  const handleGoToPage = () => {
    const parsedPageNumber = parseInt(pageNumber, 10);

    if (!isNaN(parsedPageNumber) && parsedPageNumber > 0 && parsedPageNumber <= totalPages) {
      setPageNumber(parsedPageNumber);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <div>
        <label>
          Pagina:
          <input type="number" value={pageNumber} onChange={(e) => setPageNumber(e.target.value)} />
          <button onClick={handleGoToPage}>Vai</button>
        </label>
      </div>
      <div>
        <label>
          Inserisci il numero di riga:
          <input type="text" value={selectedLine} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        {pdfPath && (
          <Document file={pdfPath} onLoadSuccess={handlePageLoadSuccess} onError={(error) => setPdfError(error)}>
            <Page pageNumber={pageNumber} />
          </Document>
        )}
        {pdfError && <p>Si è verificato un errore nel caricamento del PDF.</p>}
        {selectedLine && <h1>Riga {pageNumber} - {selectedLine}</h1>}
      </div>
    </div>
  );
};

export default PdfReader;
