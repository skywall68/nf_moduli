import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PuntoPreciso = () => {
  const [pdfPath, setPdfPath] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [pointX, setPointX] = useState(0); // Coordinata X del punto di interesse
  const [pointY, setPointY] = useState(0); // Coordinata Y del punto di interesse
  const [pointValue, setPointValue] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPdfPath(URL.createObjectURL(file));
      setPageNumber(1);
      setPointValue('');
    }
  };

  const handleLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
    setPointValue('');
  };

  const handleGetPointValue = async () => {
    try {
      const pdfDocument = await pdfjs.getDocument(pdfPath).promise;
      const pdfPage = await pdfDocument.getPage(pageNumber);

      const textContent = await pdfPage.getTextContent();

      const findTextAtPoint = (x, y) => {
        for (let i = 0; i < textContent.items.length; i++) {
          const item = textContent.items[i];
          const bbox = item.transform.map(p => p * pdfPage.getViewport({ scale: 1 }).width);

          if (x >= bbox[0] && x <= bbox[2] && y >= bbox[1] && y <= bbox[3]) {
            return item.str;
          }
        }
        return null;
      };

      const scaledPointX = (pointX / 25.4) * 72;
      const scaledPointY = (pointY / 25.4) * 72;

      const textAtPoint = findTextAtPoint(scaledPointX, scaledPointY);

      setPointValue(textAtPoint || 'Nessun testo trovato');
    } catch (error) {
      console.error('Errore durante la lettura del valore in un punto:', error);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <div>
        <label>
          Inserisci le coordinate del punto (X, Y) in millimetri:
          <input type="number" value={pointX} onChange={(e) => setPointX(e.target.value)} />
          <input type="number" value={pointY} onChange={(e) => setPointY(e.target.value)} />
          <button onClick={handleGetPointValue}>Otteni Valore</button>
        </label>
      </div>
      <h1>{pointValue}</h1>
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
        {pointValue && (
          <p>Valore al punto ({pointX} mm, {pointY} mm): {pointValue}</p>
        )}
      </div>
    </div>
  );
};

export default PuntoPreciso;

