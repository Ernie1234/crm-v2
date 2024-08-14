import React from "react";
import QRCode from "qrcode.react";

interface QRCodeProps {
  address: string;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({ address }) => {
  return (
    <div>
      <QRCode value={address} />
    </div>
  );
};

export default QRCodeComponent;
