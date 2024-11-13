import React from 'react';
import { Download, Trash2 } from 'lucide-react';
import { ConsentRecord } from '../types/consent';

interface DataManagementProps {
  consents: ConsentRecord[];
  onExport: () => void;
  onDelete: () => void;
}

export default function DataManagement({ onExport, onDelete }: DataManagementProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Data Management</h2>
      <div className="space-y-4">
        <button
          onClick={onExport}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Consent Data
        </button>
        <button
          onClick={onDelete}
          className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete All Consent Data
        </button>
      </div>
    </div>
  );
}