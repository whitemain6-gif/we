'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface GeneralTabProps {
  environmentId: string;
}

export function GeneralTab({ environmentId }: GeneralTabProps) {
  const environmentDetails = {
    name: 'Production Environment',
    url: 'manage.corefinity.com',
    website: 'manage.corefinity.com',
    namespace: '—',
    provider: 'Google Compute Platform',
    platform: 'Laravel',
    cluster: 'cf-europe-west2-cluster-1',
    environmentType: 'Production',
    infrastructureType: 'SingleHost',
    monitoring: 'Monitoring is enabled',
    currentAvailability: 'No data',
    sshGatewayVersion: 'Version 1',
    sshPort: '5004',
  };

  const renderField = (label: string, value: string, isLink = false) => (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      {isLink ? (
        <a href={`https://${value}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
          {value}
        </a>
      ) : (
        <span className="text-sm font-medium text-foreground">{value}</span>
      )}
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">Environment Details</h3>
        <Card className="p-6">
          {renderField('Name', environmentDetails.name)}
          {renderField('URL', environmentDetails.url, true)}
          {renderField('Website', environmentDetails.website, true)}
          {renderField('Namespace', environmentDetails.namespace)}
          {renderField('Provider', environmentDetails.provider)}
          {renderField('Platform', environmentDetails.platform)}
          {renderField('Cluster', environmentDetails.cluster)}
          {renderField('Environment Type', environmentDetails.environmentType)}
          {renderField('Infrastructure Type', environmentDetails.infrastructureType)}
          {renderField('Monitoring', environmentDetails.monitoring)}
          {renderField('Current Availability', environmentDetails.currentAvailability)}
          {renderField('SSH Gateway Version', environmentDetails.sshGatewayVersion)}
          {renderField('SSH Port', environmentDetails.sshPort)}
        </Card>
      </div>

      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">SEO</h3>
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Indexing Options</label>
            <select className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>Choose an option</option>
              <option>Index all pages</option>
              <option>No index</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Default Address</label>
            <select className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>Choose an option</option>
            </select>
          </div>
        </Card>
      </div>
    </div>
  );
}
