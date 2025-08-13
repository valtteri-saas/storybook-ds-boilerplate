// components/TLDR.tsx

import React from 'react';
import type { ReactNode } from 'react';

interface TLDRProps {
  children: ReactNode;
}

const TLDR: React.FC<TLDRProps> = ({ children }) => {
  return (
    <div
      style={{
        margin: '32px 0',
        border: '1px solid rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        overflow: 'hidden',
        padding: '16px 24px',
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '8px',
          color: '#1d1d1d',
        }}
      >
        TLDR
      </div>
      <div
        style={{
          fontSize: '16px',
          lineHeight: '1.5',
          color: '#333',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TLDR;
