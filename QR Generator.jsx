import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './QRGenerator.css';

const QRGenerator = () => {
  const [url, setUrl] = useState('https://scanswaad.netlify.app/menu');
  const [size, setSize] = useState(128);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000');
  const [downloadFormat, setDownloadFormat] = useState('png');

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-code");
    const url = canvas.toDataURL(`image/${downloadFormat}`);
    const link = document.createElement("a");
    link.download = `scanswaad-menu.${downloadFormat}`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="qr-generator">
      <h2>Generate QR Code for Your Digital Menu</h2>
      
      <div className="qr-controls">
        <div className="form-group">
          <label>Menu URL:</label>
          <input 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            placeholder="Enter menu URL"
          />
        </div>
        
        <div className="form-group">
          <label>Size (px):</label>
          <input 
            type="number" 
            value={size} 
            onChange={(e) => setSize(parseInt(e.target.value) || 128)} 
            min="48" 
            max="512"
          />
        </div>
        
        <div className="form-group">
          <label>Background Color:</label>
          <input 
            type="color" 
            value={bgColor} 
            onChange={(e) => setBgColor(e.target.value)} 
          />
        </div>
        
        <div className="form-group">
          <label>Foreground Color:</label>
          <input 
            type="color" 
            value={fgColor} 
            onChange={(e) => setFgColor(e.target.value)} 
          />
        </div>
        
        <div className="form-group">
          <label>Download Format:</label>
          <select 
            value={downloadFormat} 
            onChange={(e) => setDownloadFormat(e.target.value)}
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WebP</option>
          </select>
        </div>
      </div>
      
      <div className="qr-preview">
        {url && (
          <QRCode 
            id="qr-code"
            value={url} 
            size={size} 
            bgColor={bgColor} 
            fgColor={fgColor} 
            level="H"
          />
        )}
      </div>
      
      <button onClick={downloadQRCode} className="download-btn">
        Download QR Code
      </button>
    </div>
  );
};

export default QRGenerator;
