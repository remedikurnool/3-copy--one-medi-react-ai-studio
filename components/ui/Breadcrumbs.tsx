
import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
    <Link to="/" className="hover:text-primary transition-colors shrink-0">Home</Link>
    {items.map((item, index) => (
      <React.Fragment key={index}>
        <span className="mx-2 text-gray-300 dark:text-gray-600 shrink-0">/</span>
        {item.path ? (
          <Link to={item.path} className="hover:text-primary transition-colors shrink-0">{item.label}</Link>
        ) : (
          <span className="font-medium text-gray-800 dark:text-gray-200 shrink-0">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </nav>
);
