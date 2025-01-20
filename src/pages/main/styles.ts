import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

export const TopPanel = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Select = styled.div`
  display: flex;
  gap: 10px;
  font-size: 18px;

  & label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    border-radius: 7px;
    background: #34495e;
    color: #fff;
  }

  & select {
    width: 200px;
    border-radius: 7px;
    cursor: pointer;
    background: #34495e;
    color: #fff;
    border: none;
    padding: 5px;

    &:focus {
      outline: none;
    }

    & > option:hover {
      border-radius: 7px;
      cursor: pointer;
    }
  }
`;

export const Chart = styled.div`
  border-top: 1px solid;
  height: 800px;
  padding: 10px;
  overflow: auto;
`;
