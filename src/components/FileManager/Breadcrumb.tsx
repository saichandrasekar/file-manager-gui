// File: components/FileManager/Breadcrumb.tsx
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbs } from '../../utils/helpers';
import clsx from 'clsx';

interface BreadcrumbProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  currentPath,
  onNavigate
}) => {
  const breadcrumbs = generateBreadcrumbs(currentPath);

  return (
    <div className="flex items-center space-x-1 text-sm text-gray-600 p-4 bg-gray-50">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
          <button
            onClick={() => onNavigate(crumb.path)}
            className={clsx(
              'flex items-center space-x-1 hover:text-orange-600 transition-colors',
              index === breadcrumbs.length - 1 ? 'text-orange-600 font-medium' : 'text-gray-600'
            )}
          >
            {index === 0 && <Home className="w-4 h-4" />}
            <span>{crumb.name}</span>
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

