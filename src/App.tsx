import { Provider } from 'react-redux';

import { ThemeProvider } from 'styled-components';

import { useBrowserTheme } from 'hooks/useBrowserTheme';

import Main from 'pages/main';

import store from './store';

import { GlobalStyle } from 'styles/global';
import { colors } from 'styles/theme';

const App = () => {
  const [theme, setTheme] = useBrowserTheme();

  return (
    <Provider store={store}>
      <ThemeProvider theme={{ colors, theme }}>
        <GlobalStyle />
        <Main
          setTheme={setTheme}
          theme={theme}
        />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
