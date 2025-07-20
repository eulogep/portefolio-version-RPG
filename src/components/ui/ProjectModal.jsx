import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

/**
 * ProjectModal displays a modal with either an iframe (for demo) or PDF/PowerPoint (for ppt).
 * Props:
 * - open: boolean
 * - onOpenChange: function
 * - title: string
 * - url: string (iframe src)
 * - type: 'demo' | 'ppt'
 */
const ProjectModal = ({ open, onOpenChange, title, url, type }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
      <Dialog.Content className="fixed top-1/2 left-1/2 z-50 bg-white dark:bg-gray-900 rounded-xl shadow-xl p-0 max-w-3xl w-full max-h-[90vh] -translate-x-1/2 -translate-y-1/2 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <span className="font-semibold text-lg">{type === 'demo' ? `Démo : ${title}` : `Présentation : ${title}`}</span>
          <button onClick={() => onOpenChange(false)} aria-label="Fermer" className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-800">
          {type === 'demo' ? (
            <iframe
              src={url}
              title={`Démo ${title}`}
              className="w-full h-[70vh] border-0"
              allow="fullscreen; clipboard-write"
            />
          ) : (
            <iframe
              src={url}
              title={`Présentation ${title}`}
              className="w-full h-[70vh] border-0"
              allow="fullscreen"
            />
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ProjectModal;
