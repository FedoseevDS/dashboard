import styled from 'styled-components';

type ContainerProps = {
  theme: 'dark' | 'light';
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: ${({ theme }) =>
    theme.theme === 'dark' ? theme.colors.background2 : theme.colors.background1};

  & svg {
    height: 100%;
    font-size: 30px;
  }
`;

export const TopPanel = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const Toggle = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  & div {
    display: flex;
  }

  & input[type='checkbox'] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  & label {
    cursor: pointer;
    text-indent: -9999px;
    width: 70px;
    background: ${({ theme }) => theme.colors.background1};
    display: block;
    border-radius: 100px;
    position: relative;
    border: 1px solid;
  }

  & label:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 5px;
    width: 24px;
    height: 24px;
    background: ${({ theme }) => theme.colors.background2};
    border-radius: 90px;
    transition: 0.3s;
    border: 1px solid;
  }

  & input:checked + label {
    background: ${({ theme }) => theme.colors.background3};
  }

  & input:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  & label:active:after {
    width: 130px;
  }
`;

export const Chart = styled.div`
  border-top: 1px solid;
  height: 800px;
  padding: 10px;
  overflow: auto;
`;
