import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;

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

export const Chart = styled.div`
  border-top: 1px solid;
  height: 800px;
  padding: 10px;
  overflow: auto;
`;
