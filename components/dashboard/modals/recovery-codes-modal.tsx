'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, Download, Copy, Check } from 'lucide-react';

interface RecoveryCodesModalProps {
  onClose: () => void;
}

export function RecoveryCodesModal({ onClose }: RecoveryCodesModalProps) {
  const [copiedAll, setCopiedAll] = useState(false);

  const recoveryCodes = [
    'AHKL-5M9P-2XB3',
    'KB7N-Q1WX-8JC4',
    'V2G6-P8Z3-9FD1',
    'M5J4-L7K9-2RH8',
    'T6Y1-S8W3-4QE5',
    'X9N2-C4D7-1LM6',
    'P3Q7-R9S2-5VW8',
    'Z1C4-D6E9-3FG2',
  ];

  const handleCopyAll = () => {
    const text = recoveryCodes.join('\n');
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownload = () => {
    const content = `Recovery Codes for 2FA\n\nGenerated: ${new Date().toLocaleDateString()}\n\n${recoveryCodes.join('\n')}\n\nIMPORTANT: Keep these codes safe. Each code can only be used once. You can use them to regain access if you lose your authenticator device.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recovery-codes.txt';
    a.click();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Save Your Recovery Codes</DialogTitle>
          <DialogDescription>
            Store these codes in a safe place. You&apos;ll need them if you lose access to your authenticator.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Warning */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-900">
              <p className="font-medium">Save these codes immediately</p>
              <p className="mt-1">
                Each code can only be used once. If you lose your authenticator device without these backup codes, you will be locked out of your account.
              </p>
            </div>
          </div>

          {/* Recovery Codes Grid */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Your Recovery Codes</label>
            <div className="grid grid-cols-2 gap-3">
              {recoveryCodes.map((code, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded border border-border bg-muted/30 font-mono text-sm break-all"
                >
                  {code}
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <span className="font-medium">How to use:</span> If you lose access to your authenticator, you can use one of these codes to regain access to your account. Each code works only once.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-end pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download as File
            </Button>
            <Button
              variant="outline"
              onClick={handleCopyAll}
              className="gap-2"
            >
              {copiedAll ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy All
                </>
              )}
            </Button>
            <Button onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
