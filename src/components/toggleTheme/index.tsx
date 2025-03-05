import { FaMoon } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';

import { Toggle } from './styles';

import { CommonProps } from 'types/global';

const ToggleTheme = ({ setTheme, theme }: CommonProps) => {
  return (
    <Toggle>
      <FiSun />
      <div>
        <input
          checked={theme === 'dark' || undefined}
          id="switch"
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          type="checkbox"
        />
        <label htmlFor="switch">Toggle</label>
      </div>
      <FaMoon />
    </Toggle>
  );
};

export default ToggleTheme;
