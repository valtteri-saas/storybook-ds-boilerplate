import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
import { getTokens, type ResolvedTokenMeta } from '../../utils/getTokens';
import tokensFile from '../../tokens/tokens.json';

const tokens: Record<string, any> = tokensFile['design-tokens'];

interface TokenProps {
  category: string;
}

const Token: React.FC<TokenProps> = ({ category }) => {
  const tokensObj = getTokens(category);
  const [tooltipText, setTooltipText] = useState<Record<string, string>>({});

  if (Object.keys(tokensObj).length === 0) {
    const pathParts = category.trim().split('.');
    let node: any = tokens;
    let exists = true;
    for (const part of pathParts) {
      if (
        node &&
        typeof node === 'object' &&
        part in (node as Record<string, any>)
      ) {
        node = (node as Record<string, any>)[part];
      } else {
        exists = false;
        break;
      }
    }
    let canGoDeeper = false;
    if (exists && node && typeof node === 'object') {
      canGoDeeper = Object.keys(node).some(
        (key) =>
          (node as Record<string, any>)[key] &&
          typeof (node as Record<string, any>)[key] === 'object' &&
          !(
            '$type' in (node as Record<string, any>)[key] &&
            '$value' in (node as Record<string, any>)[key]
          ),
      );
    }
    return (
      <div
        style={{
          padding: '16px',
          fontStyle: 'italic',
          color: '#666',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {canGoDeeper ? (
          <>
            No tokens at this level.
            <br />
            Select a subgroup for more details.
          </>
        ) : (
          <>No tokens found for "{category}"</>
        )}
      </div>
    );
  }

  const handleCopy = (value: string, key: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setTooltipText((prev) => ({ ...prev, [key]: 'Copied' }));
      setTimeout(() => {
        setTooltipText((prev) => ({ ...prev, [key]: '' }));
      }, 2000);
    });
  };

  const getRGB = (hex: string): [number, number, number] => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];

  const luminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  };

  const getContrast = (
    rgb1: [number, number, number],
    rgb2: [number, number, number],
  ): string => {
    const lum1 = luminance(...rgb1);
    const lum2 = luminance(...rgb2);
    const contrast =
      (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
    return contrast.toFixed(2);
  };

  const getCSSVarHex = (
    cssVar: string,
    tokensObj: Record<string, ResolvedTokenMeta>,
  ): string | null => {
    const key = cssVar.replace(/^--/, '');
    const match = Object.entries(tokensObj).find(([k]) => k.endsWith(key));
    const val = match?.[1]?.resolvedValue;
    return typeof val === 'object' && val?.hex ? val.hex : null;
  };

  const renderExample = (token: ResolvedTokenMeta, path: string) => {
    const { type, resolvedValue } = token;

    if (type !== 'color') {
      switch (type) {
        case 'border-radius':
          return (
            <div
              style={{
                backgroundColor: '#dadada',
                height: 48,
                width: 48,
                borderRadius: resolvedValue,
                display: 'inline-block',
              }}
            />
          );
        case 'space':
          return (
            <div
              style={{
                height: 20,
                width: resolvedValue,
                background: '#ccc',
              }}
            />
          );
        case 'font-size':
          return (
            <div
              style={{
                fontSize: resolvedValue,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Aa
            </div>
          );
        case 'line-height':
          return (
            <div
              style={{
                fontSize: 14,
                lineHeight: resolvedValue,
                backgroundColor: '#f3f3f3',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Line height sample
            </div>
          );
        case 'font-weight':
          return (
            <div
              style={{
                fontWeight: resolvedValue as any,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Bold sample
            </div>
          );
        default:
          return (
            <code style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {JSON.stringify(resolvedValue)}
            </code>
          );
      }
    }

    let hex =
      typeof resolvedValue === 'object' && resolvedValue?.hex
        ? resolvedValue.hex
        : typeof resolvedValue === 'string'
        ? resolvedValue
        : '#ffffff';

    const tokenName = path.split('.').pop()!;
    const backgroundVar = `--${tokenName}`;

    let foregroundVar = '--color-foreground';
    const suffix = tokenName.replace('color-background-', '');
    if (
      tokenName.startsWith('color-background-') &&
      ['success', 'warning', 'error', 'info', 'accent'].includes(suffix)
    ) {
      foregroundVar = `--color-foreground-${suffix}`;
    }

    const [r, g, b] = getRGB(hex);
    if (luminance(r, g, b) < 0.4) {
      foregroundVar = '--color-foreground-inverse';
    }

    const foregroundHex = getCSSVarHex(foregroundVar, tokensObj) || '#000000';
    const [fr, fg, fb] = getRGB(foregroundHex);
    const contrast = getContrast([fr, fg, fb], [r, g, b]);

    return (
      <div style={{ textAlign: 'left' }}>
        <div
          style={{
            backgroundColor: `var(${backgroundVar}, ${hex})`,
            height: 56,
            borderRadius: 8,
            border: 'rgba(0,0,0,0.1) solid 1px',
            padding: 16,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            color: `var(${foregroundVar}, ${foregroundHex})`,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                background: `var(${foregroundVar}, ${foregroundHex})`,
                borderRadius: '50%',
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: 14, fontWeight: 500 }}>{contrast}</span>
          </div>
        </div>
        <div
          style={{
            color: '#000',
            fontSize: 14,
            marginTop: 8,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {hex}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        margin: '24px 0',
        width: '100%',
        border: '1px solid #e6e6e6',
        borderRadius: '12px',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: '#f8f8f8',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            <th style={{ padding: '12px 16px', width: '33%' }}>Example</th>
            <th style={{ padding: '12px 16px', width: '33%' }}>Description</th>
            <th style={{ padding: '12px 16px', width: '33%' }}>Token</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(tokensObj).map(([path, token], index, arr) => {
            const simple = path.split('.').pop()!;
            const cssVar = `--${simple}`;
            const varUsage = `var(${cssVar})`;
            const tooltipId = `tooltip-${path}`;
            const desc = token.description || 'No description';
            const isLast = index === arr.length - 1;
            return (
              <tr
                key={path}
                style={{
                  backgroundColor: '#fff',
                  borderBottom: isLast ? 'none' : '1px solid #eee',
                }}
              >
                <td style={{ padding: '16px' }}>
                  {renderExample(token, path)}
                </td>
                <td style={{ padding: '16px', fontSize: 14, color: '#666' }}>
                  {desc}
                </td>
                <td style={{ padding: '16px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      position: 'relative',
                    }}
                  >
                    <input
                      type="text"
                      value={varUsage}
                      readOnly
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '14px',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        backgroundColor: '#f5f5f5',
                        width: '100%',
                        cursor: 'text',
                      }}
                      onClick={(e) => e.currentTarget.select()}
                    />
                    <button
                      data-tooltip-id={tooltipId}
                      data-tooltip-content={tooltipText[tooltipId]}
                      onClick={() => handleCopy(varUsage, tooltipId)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        right: 8,
                        position: 'absolute',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        color: 'rgba(0,0,0,0.3)',
                      }}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                    <Tooltip
                      id={tooltipId}
                      noArrow
                      style={{
                        fontSize: '11px',
                        background: '#000',
                        color: '#fff',
                        fontFamily: 'Inter, system-ui, sans-serif',
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Token;
