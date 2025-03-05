import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 10px;
  font-size: 18px;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 230px;
  border-radius: 7px;
  background: ${({ theme }) => theme.colors.background3};
  color: ${({ theme }) => theme.colors.color1};
`;

export const SelectForm = styled.div<{ isClick?: boolean }>`
  position: relative;

  & > button {
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 32px;
    width: 230px;
    border-radius: 7px;
    background: ${({ theme }) => theme.colors.background3};
    color: ${({ theme }) => theme.colors.color1};
    border: none;

    & > svg {
      position: absolute;
      right: 0;
      transition: transform 0.4s ease-in-out;
      transform: ${({ isClick }) => (isClick ? 'rotate(180deg)' : 'rotate(0deg)')};
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

export const DropDown = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 5px;
  width: 230px;
  padding: 5px 5px;
  position: absolute;
  z-index: 20;
  background: ${({ theme }) => theme.colors.background3};
  border-radius: 7px;
  margin-top: 5px;

  & span {
    color: ${({ theme }) => theme.colors.color1};
  }

  & button {
    cursor: pointer;
    text-align: start;
    background: ${({ theme }) => theme.colors.background3};
    color: ${({ theme }) => theme.colors.color1};
    width: 100%;
    border: none;

    &:hover {
      background: ${({ theme }) => theme.colors.background4};
    }
  }
`;
