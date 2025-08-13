import React from 'react';
import { ConfigProvider } from 'antd';
import { themeVariables } from '../../antd/themeVariables';

const ThemeProvider: React.FC<{
  children: React.ReactNode;
  useTheme?: boolean;
}> = ({ children, useTheme = true }) => {
  if (!useTheme) return <>{children}</>;

  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        token: {
          ...themeVariables,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
