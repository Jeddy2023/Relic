import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadCrumbProps {
  name: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ name }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="w-full h-36 mb-5 px-6 bg-gray-100 dark:bg-[#0e0e0ec1] flex flex-col justify-center relative overflow-hidden">
      <h1 className="font-saira text-3xl mb-2 font-semibold dark:text-white">{name}</h1>
      <p className="text-sm">
        <Link to="/" className="hover:underline text-gray-600 dark:text-gray-300">Home</Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <span key={to}>
              <span className='text-gray-600 dark:text-gray-300'>{' / '}</span>
              <Link to={to} className="hover:underline text-gray-600 dark:text-gray-300">
                {value.replace(/-/g, ' ')}
              </Link>
            </span>
          );
        })}
      </p>
      <div className="absolute w-24 h-24 bg-green-500 opacity-50 rounded-full -top-12 -left-12"></div>
      <div className="absolute w-24 h-24 bg-green-500 opacity-50 rounded-full -bottom-12 -right-12"></div>
    </div>
  );
}

export default BreadCrumb;
