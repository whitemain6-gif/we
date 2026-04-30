'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, ChevronsUpDown, CheckCircle2, Eye } from 'lucide-react';

interface Pod {
  name: string;
  node: string;
  nodeType: string;
  ip: string;
  age: string;
  containers: string;
  cpu: string;
  memory: string;
  restarts: number;
  ready: boolean;
  status: string;
}

const mockPods: Pod[] = [
  {
    name: 'adminer-deployment-79cfdb74f8-f6x8z',
    node: '1-a117bd32-njch',
    nodeType: 'c4a-standard-16',
    ip: '10.120.16.17',
    age: '2w',
    containers: '1/1',
    cpu: '1m / 500m',
    memory: '8Mi / 1024Mi',
    restarts: 0,
    ready: true,
    status: 'Running'
  },
  {
    name: 'adminer-deployment-fb689bfc4-b2tjq',
    node: '2-0b5d2096-cfmn',
    nodeType: 'n2-custom-16-102400',
    ip: '10.40.46.119',
    age: '4h',
    containers: '1/1',
    cpu: '1m / 500m',
    memory: '5Mi / 1024Mi',
    restarts: 0,
    ready: true,
    status: 'Running'
  },
  {
    name: 'adminer-deployment-fb689bfc4-qw659',
    node: '1-38a39b7c-ie2w',
    nodeType: 'n2-custom-16-100352',
    ip: '10.36.16.3',
    age: '1mo',
    containers: '1/1',
    cpu: '1m / 500m',
    memory: '16Mi / 1024Mi',
    restarts: 0,
    ready: true,
    status: 'Running'
  },
  {
    name: 'alertmanager-k-prometheus-alertmanager-0',
    node: '2-49bb9ea7-hppf',
    nodeType: 'n2d-highmem-8',
    ip: '10.76.21.16',
    age: '6mos',
    containers: '2/2',
    cpu: '1m',
    memory: '49283072m',
    restarts: 0,
    ready: true,
    status: 'Running'
  },
  {
    name: 'alertmanager-kube-prometheus-stack-1701-alertmanager-0',
    node: '2-f5c2d627-80dg',
    nodeType: 'c4a-highmem-16',
    ip: '10.120.43.83',
    age: '2mos',
    containers: '2/2',
    cpu: '1m',
    memory: '49283072m',
    restarts: 0,
    ready: true,
    status: 'Running'
  },
  {
    name: 'alertmanager-kube-prometheus-stack-1701-alertmanager-0', // second one with different node
    node: '1-a1ec8800-cl1n',
    nodeType: 'n2-custom-20-163840',
    ip: '10.36.13.253',
    age: '4mos',
    containers: '2/2',
    cpu: '1m',
    memory: '49283072m',
    restarts: 0,
    ready: true,
    status: 'Running'
  },
  {
    name: 'alertmanager-kube-prometheus-stack-1756-alertmanager-0',
    node: '2-4545d92b-86np',
    nodeType: 'c4a-standard-16',
    ip: '10.52.2.156',
    age: '6mos',
    containers: '2/2',
    cpu: '1m',
    memory: '52428800m',
    restarts: 0,
    ready: true,
    status: 'Running'
  }
];

interface PodsTabProps {
  environmentId: string;
}

export function PodsTab({ environmentId }: PodsTabProps) {
  const [pods, setPods] = useState<Pod[]>(mockPods);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPods = pods.filter(pod =>
    pod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Search size={16} className="text-muted-foreground" />
        <Input
          placeholder="Search pods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
      </div>

      <p className="text-sm text-muted-foreground">Pods: Last updated 30 seconds ago</p>

      <div className="bg-card border-none rounded-none w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f0f7f9] border-y border-[#dcecf1]">
              <tr>
                <th className="px-4 py-3 text-[10px] font-bold text-[#2e5e7e] uppercase whitespace-nowrap cursor-pointer hover:bg-[#e6f0f4] transition-colors group">
                  <div className="flex items-center gap-1">
                    NAME
                    <ChevronsUpDown className="w-3 h-3 text-[#5da2c3] group-hover:text-[#2e5e7e]" />
                  </div>
                </th>
                <th className="px-4 py-3 text-[10px] font-bold text-[#2e5e7e] uppercase whitespace-nowrap">NODE</th>
                <th className="px-4 py-3 text-[10px] font-bold text-[#2e5e7e] uppercase whitespace-nowrap cursor-pointer hover:bg-[#e6f0f4] transition-colors group">
                  <div className="flex items-center gap-1">
                    NODE TYPE
                    <ChevronsUpDown className="w-3 h-3 text-[#5da2c3] group-hover:text-[#2e5e7e]" />
                  </div>
                </th>
                <th className="px-4 py-3 text-[10px] font-bold text-[#2e5e7e] uppercase whitespace-nowrap cursor-pointer hover:bg-[#e6f0f4] transition-colors group">
                  <div className="flex items-center gap-1">
                    IP
                    <ChevronsUpDown className="w-3 h-3 text-[#5da2c3] group-hover:text-[#2e5e7e]" />
                  </div>
                </th>
                <th className="px-4 py-3 text-[10px] font-bold text-[#2e5e7e] uppercase whitespace-nowrap">AGE</th>
                <th className="px-4 py-3 text-[10px] font-bold text-[#2e5e7e] uppercase whitespace-nowrap">CONTAINERS</th>
                <th className="px-4 py-3 text-[10px] font-bold text-[#2e5e7e] uppercase whitespace-nowrap">CPU</th>
                <th className="px-4 py-3 text-[10px] font-bold text-[#2e5e7e] uppercase whitespace-nowrap">MEMORY</th>
                <th className="px-4 py-3 text-[10px] font-bold text-[#2e5e7e] uppercase whitespace-nowrap">RESTARTS</th>
                <th className="px-4 py-3 text-[10px] font-bold text-[#2e5e7e] uppercase whitespace-nowrap">READY</th>
                <th className="px-4 py-3 text-[10px] font-bold text-[#2e5e7e] uppercase whitespace-nowrap">STATUS</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf3f6] bg-white">
              {filteredPods.map((pod, idx) => (
                <tr key={idx} className="hover:bg-[#f6fafb] transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-[13px] font-bold text-[#1f4a76]">{pod.name}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-[13px] font-bold text-[#1f4a76]">{pod.node}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-[13px] text-[#64849c]">{pod.nodeType}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-[13px] text-[#64849c]">{pod.ip}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-[13px] text-[#64849c]">{pod.age}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-[13px] text-[#64849c]">{pod.containers}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-[13px] text-[#64849c]">{pod.cpu}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-[13px] text-[#64849c]">{pod.memory}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-[13px] text-[#64849c]">{pod.restarts}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {pod.ready ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <span className="text-[13px] text-[#64849c]">No</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-[13px] text-[#64849c]">{pod.status}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <button className="text-[#3b93b8] hover:text-[#1f4a76] transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
