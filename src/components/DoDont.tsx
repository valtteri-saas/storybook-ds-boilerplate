import React from 'react';

interface DoDontRow {
  do: React.ReactNode;
  dont: React.ReactNode;
}

interface DoDontProps {
  rows: DoDontRow[];
}

const CheckIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
      fill="#2DA01D"
    />
  </svg>
);

const XIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 
         10.59 12 5 17.59 6.41 19 12 13.41
         17.59 19 19 17.59 13.41 12 19 6.41z"
      fill="#DB232D"
    />
  </svg>
);

const DoDont: React.FC<DoDontProps> = ({ rows }) => {
  return (
    <div
      style={{
        margin: '32px 0',
        border: '1px solid rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* Header row with aligned icons */}
      <div
        style={{
          display: 'flex',
          padding: '16px 24px',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: '50%',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <div
            style={{
              backgroundColor: '#ccf5c7',
              borderRadius: '999px',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {CheckIcon}
          </div>
        </div>
        <div
          style={{
            width: '50%',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffd0cc',
              borderRadius: '999px',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {XIcon}
          </div>
        </div>
      </div>

      {/* Paired rows */}
      {rows.map((row, index) => (
        <div key={index}>
          <div
            style={{
              display: 'flex',
              padding: '16px 24px',
              fontSize: '16px',
            }}
          >
            <div style={{ flex: 1, color: '#111' }}>{row.do}</div>
            <div style={{ flex: 1, color: '#111', opacity: 0.6 }}>
              {row.dont}
            </div>
          </div>
          {index < rows.length - 1 && (
            <div
              style={{
                height: '1px',
                backgroundColor: '#000000',
                opacity: 0.05,
                margin: '0 24px',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DoDont;
