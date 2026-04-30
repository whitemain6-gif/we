'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Copy, Check } from 'lucide-react';

interface AddSSHKeyModalProps {
  onClose: () => void;
  onAdd: (keyData: { name: string; keyType: string; publicKey: string }) => void;
}

export function AddSSHKeyModal({ onClose, onAdd }: AddSSHKeyModalProps) {
  const [step, setStep] = useState<'choice' | 'form'>('choice');
  const [name, setName] = useState('');
  const [keyType, setKeyType] = useState('ED25519');
  const [publicKey, setPublicKey] = useState('');
  const [copiedSample, setCopiedSample] = useState(false);

  const sampleED25519 = 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEn4Y3q/fCrCc4RNxKXlVvFiVkW6K8R4m9L2Q7p9R3b7 user@example.com';
  const sampleRSA = 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCrZqBCjJKiX2M7u4Z3L3K5G9P2K8Y1X5Z3L2K7J5M9 user@example.com';

  const handleAddKey = () => {
    if (!name.trim()) {
      alert('Please enter a key name');
      return;
    }
    if (!publicKey.trim()) {
      alert('Please paste your public key');
      return;
    }

    onAdd({
      name,
      keyType,
      publicKey,
    });
  };

  const copySample = (sample: string) => {
    navigator.clipboard.writeText(sample);
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2000);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add SSH Key</DialogTitle>
          <DialogDescription>
            {step === 'choice'
              ? 'Choose how you&apos;d like to add your SSH key'
              : 'Enter your public SSH key details'}
          </DialogDescription>
        </DialogHeader>

        {step === 'choice' ? (
          <div className="space-y-3 py-4">
            <button
              onClick={() => setStep('form')}
              className="w-full p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors text-left space-y-2"
            >
              <div className="font-medium text-foreground">Paste a public key</div>
              <p className="text-sm text-muted-foreground">
                Copy and paste your existing public SSH key
              </p>
            </button>

            <button
              onClick={() => {
                // In a real app, this would open a guide
                alert('SSH key generation guide - use: ssh-keygen -t ed25519');
              }}
              className="w-full p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors text-left space-y-2"
            >
              <div className="font-medium text-foreground">Generate a new key</div>
              <p className="text-sm text-muted-foreground">
                View instructions for generating a new SSH key
              </p>
            </button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {/* Key Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Key Name</label>
              <Input
                placeholder="e.g., Laptop Development"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Key Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Key Type</label>
              <Select value={keyType} onValueChange={setKeyType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ED25519">ED25519 (Recommended)</SelectItem>
                  <SelectItem value="RSA">RSA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Public Key */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Public Key</label>
              <Textarea
                placeholder="Paste your public SSH key here (starting with ssh-ed25519 or ssh-rsa)"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                rows={5}
                className="font-mono text-xs"
              />
            </div>

            {/* Sample Keys */}
            <div className="bg-muted/30 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                Sample public keys for reference:
              </div>
              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-foreground">ED25519:</p>
                  <div className="flex items-start sm:items-center gap-2 bg-background rounded p-2">
                    <code className="text-xs font-mono flex-1 break-all">
                      {sampleED25519}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copySample(sampleED25519)}
                      className="h-6 w-6 p-0 shrink-0"
                    >
                      {copiedSample ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-foreground">RSA:</p>
                  <div className="flex items-start sm:items-center gap-2 bg-background rounded p-2">
                    <code className="text-xs font-mono flex-1 break-all">
                      {sampleRSA}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copySample(sampleRSA)}
                      className="h-6 w-6 p-0 shrink-0"
                    >
                      {copiedSample ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-end pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setStep('choice')}
              >
                Back
              </Button>
              <Button onClick={handleAddKey}>
                Add SSH Key
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
