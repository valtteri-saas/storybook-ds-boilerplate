import React from 'react';

interface SpacingIndicatorProps {
  label?: string;
}

// ===============================
// 📏 Vertical Spacing
// ===============================
interface VerticalSpacingIndicatorProps extends SpacingIndicatorProps {
  height?: number;
}

export const VerticalSpacingIndicator: React.FC<
  VerticalSpacingIndicatorProps
> = ({ height = 24, label = `${height}px` }) => {
  const lineHeight = height - 2;

  return (
    <div
      style={{
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        lineHeight: '1px',
        flexShrink: 0,
      }}
    >
      {/* Top cap */}
      <div style={{ width: '100%', height: 1, borderTop: '1px dashed red' }} />

      {/* Vertical dashed line */}
      <div
        style={{
          width: 1,
          height: lineHeight,
          borderLeft: '1px dashed red',
        }}
      />

      {/* Bottom cap */}
      <div style={{ width: '100%', height: 1, borderTop: '1px dashed red' }} />

      {/* Label next to line */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-100%, -50%)',
          fontSize: 10,
          color: 'red',
          padding: '0 4px',
          fontFamily: 'monospace',
        }}
      >
        {label}
      </div>
    </div>
  );
};

// ===============================
// ↔️ Horizontal Spacing
// ===============================
interface HorizontalSpacingIndicatorProps extends SpacingIndicatorProps {
  width?: number;
}

export const HorizontalSpacingIndicator: React.FC<
  HorizontalSpacingIndicatorProps
> = ({ width = 32, label = `${width}px` }) => {
  const lineWidth = 1;
  const centerLineWidth = width - 2;

  return (
    <div
      style={{
        width,
        position: 'relative',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {/* Left vertical dashed line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: lineWidth,
          borderLeft: '1px dashed red',
        }}
      />

      {/* Right vertical dashed line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: lineWidth,
          borderRight: '1px dashed red',
        }}
      />

      {/* Center horizontal dashed line */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translateX(-${centerLineWidth / 2}px)`,
          width: centerLineWidth,
          height: 1,
          borderTop: '1px dashed red',
        }}
      />

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translateX(-50%)',
          fontSize: 10,
          fontFamily: 'monospace',
          color: 'red',
          padding: '0 4px',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </div>
  );
};
