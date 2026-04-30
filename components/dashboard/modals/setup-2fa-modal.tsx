'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Copy, Check } from 'lucide-react';

interface Setup2FAModalProps {
  onClose: () => void;
  onSetup: () => void;
}

export function Setup2FAModal({ onClose, onSetup }: Setup2FAModalProps) {
  const [step, setStep] = useState<'intro' | 'setup' | 'verify'>('intro');
  const [code, setCode] = useState('');
  const [copiedQR, setCopiedQR] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);

  const qrCodeUrl = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23FFFFFF" width="200" height="200"/%3E%3Crect fill="%23000000" x="0" y="0" width="40" height="40"/%3E%3Crect fill="%23000000" x="160" y="0" width="40" height="40"/%3E%3Crect fill="%23000000" x="0" y="160" width="40" height="40"/%3E%3Ctext x="100" y="100" text-anchor="middle" fill="%23999" font-size="12"%3EQR Code%3C/text%3E%3C/svg%3E';
  const secret = 'JBSWY3DPEBLW64TMMQ======';
  const backupCode = 'XXXX-XXXX-XXXX-XXXX';

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secret);
    setCopiedSecret(true);
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  const handleVerify = () => {
    if (!code.trim()) {
      alert('Please enter the verification code');
      return;
    }
    if (code.length !== 6) {
      alert('Verification code must be 6 digits');
      return;
    }
    setStep('verify');
    // After successful verification, show success
    setTimeout(() => {
      onSetup();
    }, 1500);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
          <DialogDescription>
            {step === 'intro'
              ? 'Add an extra layer of security to your account'
              : step === 'setup'
              ? 'Scan the QR code with your authenticator app'
              : 'Verifying your setup...'}
          </DialogDescription>
        </DialogHeader>

        {step === 'intro' && (
          <div className="space-y-4 py-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium">What you&apos;ll need:</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>A phone or tablet</li>
                  <li>An authenticator app (Google Authenticator, Authy, Microsoft Authenticator, etc.)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-foreground">
              Two-factor authentication adds an extra layer of security by requiring a time-based code in addition to your password.
            </p>

            <div className="flex gap-2 justify-end pt-4 border-t border-border">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={() => setStep('setup')}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 'setup' && (
          <div className="space-y-6 py-4">
            {/* QR Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Step 1: Scan QR Code</label>
              <div className="flex justify-center p-4 bg-muted rounded-lg">
                <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
              </div>
              <p className="text-xs text-muted-foreground">
                Open your authenticator app and scan this QR code
              </p>
            </div>

            {/* Secret Key */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Step 2: Manual Entry (if needed)</label>
              <div className="flex gap-2">
                <Input
                  value={secret}
                  disabled
                  className="font-mono text-sm"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopySecret}
                  className="w-12 p-0"
                >
                  {copiedSecret ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                If you can&apos;t scan the QR code, enter this key manually in your authenticator
              </p>
            </div>

            {/* Verification Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Step 3: Enter Verification Code</label>
              <Input
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="text-center text-2xl tracking-widest font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-end pt-4 border-t border-border">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleVerify} disabled={code.length !== 6}>
                Verify
              </Button>
            </div>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-4 py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">2FA Enabled Successfully!</h3>
              <p className="text-sm text-muted-foreground">
                Your account is now protected with two-factor authentication.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
