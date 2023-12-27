import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfReaderRiga2 = () => {
  const [pdfPath, setPdfPath] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [selectedLine, setSelectedLine] = useState('');
  const [selectedLineText, setSelectedLineText] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPdfPath(URL.createObjectURL(file));
      setPageNumber(1);
    }
  };

  const handleLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSelectedLine(value);
  };

  const handleExtractLine = async () => {
    try {
      const pdfDocument = await pdfjs.getDocument(pdfPath).promise;
      const pdfPage = await pdfDocument.getPage(pageNumber);
      const textContent = await pdfPage.getTextContent();

      const lines = textContent.items.map(item => item.str);
      const selectedLineNumber = parseInt(selectedLine, 10);

      if (!isNaN(selectedLineNumber) && selectedLineNumber > 0 && selectedLineNumber <= lines.length) {
        const selectedLineText = lines[selectedLineNumber - 1];
        setSelectedLineText(selectedLineText);
      } else {
        // Se il numero di riga non è valido, resetta il testo selezionato
        setSelectedLineText('');
      }
    } catch (error) {
      console.error('Errore durante l\'estrazione del testo:', error);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <div>
        <label>
          Inserisci il numero di riga:
          <input type="text" value={selectedLine} onChange={handleInputChange} />
          <button onClick={handleExtractLine}>Estrai Riga</button>
        </label>
      </div>
      <h1>{selectedLineText}</h1>
      <div>
        {pdfPath && (
          <div>
            <Document file={pdfPath} onLoadSuccess={handleLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
        )}
        {totalPages && (
          <p>
            Pagina {pageNumber} di {totalPages}
          </p>
        )}
        {selectedLineText && (
          <h1>{selectedLineText}</h1>
        )}
      </div>
    </div>
  );
};



export default PdfReaderRiga2;
