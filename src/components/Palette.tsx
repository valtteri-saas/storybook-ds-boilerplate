// components/Palette.tsx
import React, { useState } from 'react';
import { getTokens } from '../../utils/getTokens';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { readableColorIsBlack } from 'color2k';

const Palette: React.FC<{ colorGroup: string }> = ({ colorGroup }) => {
  // Get tokens and convert them to a color palette
  const tokens = getTokens(colorGroup);

  // Convert tokens to a more usable format for colors
  const colorPalette = Object.entries(tokens).reduce<Record<string, string>>(
    (acc, [key, token]) => {
      // Extract the name from the full key path
      const name = key.split('.').pop() || '';
      // Ensure we have a string color value
      if (token.type === 'color' && token.resolvedValue) {
        const colorValue =
          typeof token.resolvedValue === 'string'
            ? token.resolvedValue
            : token.resolvedValue.hex || '#CCCCCC';
        acc[name] = colorValue;
      }
      return acc;
    },
    {},
  );

  const [tooltipText, setTooltipText] = useState<Record<string, string>>({});
  const [hoveredSwatch, setHoveredSwatch] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleCopy = (value: string, key: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setTooltipText((prev) => ({ ...prev, [key]: 'Copied' }));
      setTimeout(() => {
        setTooltipText((prev) => ({ ...prev, [key]: '' }));
      }, 2000);
    });
  };

  return (
    <div
      style={{
        margin: '24px 0',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '6px',
        overflow: 'hidden',
        border: '1px solid rgba(8,30,5, 0.5)',
        boxSizing: 'border-box',
      }}
    >
      {Object.entries(colorPalette).map(([colorName, colorValue]) => {
        // Safely assert colorValue as string since we've filtered above
        const textColor = readableColorIsBlack(colorValue as string)
          ? '#000000'
          : '#FFFFFF';
        const hexTooltipId = `copy-hex-${colorName}`;
        const varTooltipId = `copy-var-${colorName}`;
        const variableName = `var(--${colorName.toLowerCase()})`;

        return (
          <div
            key={colorName}
            style={{
              width: '100%',
              display: 'flex',
              boxSizing: 'border-box',
            }}
            onMouseEnter={() => setHoveredSwatch(colorName)}
            onMouseLeave={() => setHoveredSwatch(null)}
          >
            <div
              style={{
                backgroundColor: colorValue as string,
                width: '100%',
                padding: '12px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: textColor,
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  fontWeight: '600',
                  fontSize: '12px',
                  textTransform: 'lowercase',
                }}
              >
                {colorName}
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  opacity: hoveredSwatch === colorName ? 1 : 0,
                  transition: 'opacity 0.2s ease-in-out',
                }}
              >
                {/* Hex Copy Button */}
                <div
                  data-tooltip-id={hexTooltipId}
                  data-tooltip-content={
                    tooltipText[hexTooltipId] ||
                    `Copy '${colorValue}' to clipboard`
                  }
                  style={{
                    cursor: 'pointer',
                    fontSize: '12px',
                    gap: '6px',
                    placeItems: 'center',
                    display: 'flex',
                    padding: '4px',
                    textDecoration:
                      hoveredButton === `hex-${colorName}`
                        ? 'underline'
                        : 'none',
                  }}
                  onClick={() => handleCopy(colorValue as string, hexTooltipId)}
                  onMouseEnter={() => setHoveredButton(`hex-${colorName}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  Hex
                  <FontAwesomeIcon icon={faCopy} />
                </div>
                {/* Variable Copy Button */}
                <div
                  data-tooltip-id={varTooltipId}
                  data-tooltip-content={
                    tooltipText[varTooltipId] ||
                    `Copy '${variableName}' to clipboard`
                  }
                  style={{
                    cursor: 'pointer',
                    fontSize: '12px',
                    gap: '6px',
                    placeItems: 'center',
                    display: 'flex',
                    padding: '4px',
                    textDecoration:
                      hoveredButton === `var-${colorName}`
                        ? 'underline'
                        : 'none',
                  }}
                  onClick={() => handleCopy(variableName, varTooltipId)}
                  onMouseEnter={() => setHoveredButton(`var-${colorName}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  Variable
                  <FontAwesomeIcon icon={faCopy} />
                </div>
              </div>
            </div>
            {/* Tooltips for this color */}
            <Tooltip
              noArrow
              id={hexTooltipId}
              style={{
                zIndex: 9999,
                fontSize: '11px',
                padding: '4px 8px',
                color: 'white',
                backgroundColor: 'black',
              }}
            />
            <Tooltip
              noArrow
              id={varTooltipId}
              style={{
                zIndex: 9999,
                fontSize: '11px',
                padding: '4px 8px',
                color: 'white',
                backgroundColor: 'black',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Palette;
