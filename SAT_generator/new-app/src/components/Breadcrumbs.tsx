
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li 
            key={item.href} 
            className={cn("inline-flex items-center", index > 0 && "flex")}
          >
            {index > 0 && <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />}
            {item.active ? (
              <span className="text-primary font-medium">{item.label}</span>
            ) : (
              <Link 
                to={item.href} 
                className="text-muted-foreground hover:text-primary"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
