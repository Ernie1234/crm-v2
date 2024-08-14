import { toast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import React, { useState } from "react";

interface CopyToClipboardProps {
  text: string;
  onCopy?: () => void;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text, onCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast({
      description: isCopied
        ? "Copied to clipboard!"
        : "Copying to clipboard...",
      duration: 2000,
    });
    if (onCopy) {
      onCopy();
    }
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  return (
    <div onClick={handleCopy}>
      <Copy size={22} className="text-green-700" />
    </div>
  );
};

export default CopyToClipboard;
