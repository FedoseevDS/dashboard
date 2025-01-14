import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

export const Button = styled.div`
  display: flex;
  justify-content: space-between;

  & button {
    width: 200px;
    cursor: pointer;
    border-radius: 7px;
    border: none;
    padding: 5px;

    &:hover {
      background: blue;
    }
  }
`;
