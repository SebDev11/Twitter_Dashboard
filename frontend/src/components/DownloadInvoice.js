import React from 'react';
import axios from 'axios';

const DownloadInvoice = () => {

    const downloadInvoice = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/generate-invoice');

            const { filepath } = response.data;

            const link = document.createElement('a');
            link.href = filepath;
            link.setAttribute('download', 'invoice.pdf');
            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading invoice:', error.message);
        }
    };


  return (
    <div>
      <button onClick={downloadInvoice}>Download Invoice</button>
    </div>
  );
};

export default DownloadInvoice;
