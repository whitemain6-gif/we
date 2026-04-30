'use client';

import { Card } from '@/components/ui/card';

interface EmailsTabProps {
  environmentId: string;
}

export function EmailsTab({ environmentId }: EmailsTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">SMTP Details</h3>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">SMTP Host</span>
              <span className="text-sm font-medium text-foreground">—</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">SMTP Port</span>
              <span className="text-sm font-medium text-foreground">—</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Username</span>
              <span className="text-sm font-medium text-foreground">—</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Encryption</span>
              <span className="text-sm font-medium text-foreground">—</span>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">Transactional Emails</h3>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Pending setup</p>
        </Card>
      </div>

      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">Outgoing Emails</h3>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Default outgoing email address</span>
            <span className="text-sm font-medium text-foreground">sales@manage.corefinity.com</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
