import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfReaderRiga = () => {
  const [pdfPath, setPdfPath] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [selectedLine, setSelectedLine] = useState('');
  const [rigaSelezionata, setRigaSelezionata]= useState('');
  const [pdfText, setPdfText] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPdfPath(URL.createObjectURL(file));
      setPageNumber(1);
    }
  };

  const handleLoadSuccess = async ({ numPages }) => {
    setTotalPages(numPages);

    // Estrai il testo dalla prima pagina
    const pdfDocument = await pdfjs.getDocument(pdfPath).promise;
    const pdfPage = await pdfDocument.getPage(1);
    const textContent = await pdfPage.getTextContent();
    const text = textContent.items.map(item => item.str).join(' ');
    setPdfText(text);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSelectedLine(value);
  };

  const handleExtractLine = () => {
    // Estrai solo la riga selezionata
    const lines = pdfText.split('\n');
    const selectedLineNumber = parseInt(selectedLine, 10);

    if (!isNaN(selectedLineNumber) && selectedLineNumber > 0 && selectedLineNumber <= lines.length) {
      const selectedLineText = lines[selectedLineNumber - 1];
      console.log(selectedLineText);
      setRigaSelezionata(selectedLineText);
      // Puoi fare qualcosa con il testo estratto, ad esempio visualizzarlo nell'interfaccia utente
    } else {
        setRigaSelezionata('nessuna riga')
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
      <h1>{rigaSelezionata}</h1>
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
      </div>
    </div>
  );
};

export default PdfReaderRiga;

