import React from 'react';

const Loader: React.FC = () => {
  return (
    <main className="w-full flex justify-center items-center h-screen">
      <div className="relative w-20 h-20">
        <div className="absolute h-20 w-20 border border-[#32c36c] border-t-transparent rounded-full animate-spin spinner-1"></div>
        <div className="absolute h-20 w-20 border border-[#32c36c] border-b-transparent rounded-full animate-spin spinner-2"></div>
        <div className="absolute h-20 w-20 border border-[#32c36c] border-l-transparent rounded-full animate-spin spinner-3"></div>
      </div>
    </main>
  );
};

export default Loader;
