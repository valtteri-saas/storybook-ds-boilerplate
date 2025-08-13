// components/Logo.tsx

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { readableColor } from 'color2k';

interface LogoProps {
  name: string;
  path: string;
  description?: string;
  background?: string;
  maxWidth?: string;
  fileTypes?: {
    [key: string]: string;
  };
}

const Logo: React.FC<LogoProps> = ({
  name,
  path,
  description,
  background = 'transparent',
  maxWidth = '300px',
  fileTypes = { SVG: path },
}) => {
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Changed from NodeJS.Timeout to number for browser compatibility
  const timeoutRef = useRef<number | null>(null);

  // Function to handle logo download
  const handleDownload = (filePath: string) => {
    const fileName = filePath.split('/').pop() || '';

    fetch(filePath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => console.error('Error downloading logo:', error));
  };

  // Handle mouse enter for dropdown
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsIconHovered(true);
    setIsDropdownOpen(true);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    setIsIconHovered(false);
    timeoutRef.current = window.setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Determine icon color based on background
  const iconColor =
    background !== 'transparent' ? readableColor(background) : '#333';

  return (
    <div style={{ marginBottom: '32px' }}>
      <div
        style={{
          background,
          padding: '24px',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '160px',
          border: background === 'transparent' ? '1px dashed #e0e0e0' : 'none',
          position: 'relative',
        }}
      >
        <img
          src={path}
          alt={name}
          style={{
            maxWidth,
            maxHeight: '120px',
            objectFit: 'contain',
          }}
        />

        {/* Hover-based dropdown with padding for menu items */}
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <FontAwesomeIcon
              icon={faDownload}
              style={{
                width: '16px',
                height: '16px',
                color: iconColor,
                opacity: isIconHovered || isDropdownOpen ? 1 : 0.6,
                transition: 'opacity 0.2s ease-in-out',
              }}
            />
          </div>

          {/* Custom dropdown menu */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              marginTop: '4px',
              width: '100px',
              borderRadius: '6px',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
              fontSize: '14px',
              opacity: isDropdownOpen ? 1 : 0,
              visibility: isDropdownOpen ? 'visible' : 'hidden',
              transform: isDropdownOpen ? 'scale(1)' : 'scale(0.95)',
              transformOrigin: 'top right',
              transition:
                'opacity 100ms ease-out, transform 100ms ease-out, visibility 100ms',
              padding: '4px', // Added 4px padding to menu items container
            }}
          >
            {Object.entries(fileTypes).map(([type, filePath]) => (
              <button
                key={type}
                onClick={() => handleDownload(filePath)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px 12px',
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: '12px',
        }}
      >
        <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600 }}>
          {name}
        </h3>
        {description && (
          <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Logo;
