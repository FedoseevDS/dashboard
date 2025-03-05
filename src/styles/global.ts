import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    background: ${({ theme }) =>
      theme.theme === 'dark' ? theme.colors.background2 : theme.colors.background1};
  }
`;
