import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfArray = () => {
  const [pdfPath, setPdfPath] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [selectedLine, setSelectedLine] = useState('');
  const [selectedLineText, setSelectedLineText] = useState('');
  const [linesArray, setLinesArray] = useState([]);
  const [indexOfCliente, setIndexOfCliente] = useState(null);
  const [cliente, setCliente]= useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPdfPath(URL.createObjectURL(file));
      setPageNumber(1);
      setLinesArray([]); // Resetta l'array quando il file cambia
      setIndexOfCliente(null); // Resetta l'indice quando il file cambia
      setCliente('')
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

      setLinesArray(lines); // Aggiorna l'array con le nuove righe

      const selectedLineNumber = parseInt(selectedLine, 10);

      if (!isNaN(selectedLineNumber) && selectedLineNumber > 0 && selectedLineNumber <= lines.length) {
        const selectedLineText = lines[selectedLineNumber - 1];
        setSelectedLineText(selectedLineText);
      } else {
        // Se il numero di riga non è valido, resetta il testo selezionato
        setSelectedLineText('');
      }

      const indexCliente = lines.findIndex(line => line.includes('Tabella Ferri n.'));

      if (indexCliente !== -1) {
        
        setIndexOfCliente(indexCliente+15);
        setCliente(linesArray[indexOfCliente])
       
      } else {
        // Se 'Cliente' non è trovato, resetta l'indice
        setIndexOfCliente(null);
        setCliente('non trovato')
      }
    } catch (error) {
      console.error('Errore durante l\'estrazione del testo:', error);
    }
  };
  
 console.log('cliente è:', linesArray[indexOfCliente])
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
        {indexOfCliente !== null && (
          <>
           <h1>Indice di 'Tabella ferri n.' nell'array: {indexOfCliente}</h1>
          
          
          </>
         
        )}
        {totalPages && (
          <p>
            Pagina {pageNumber} di {totalPages}
          </p>
        )}
        {linesArray.length > 0 && (
          <ul>
            {linesArray.map((line, index) => (
              <li key={index}>{index}-<h2>{line}</h2></li>
            ))}
          </ul>
        )}


      </div>
    
        
    </div>
  );
};

export default PdfArray;
