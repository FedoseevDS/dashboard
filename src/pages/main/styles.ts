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
  }
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
    background: white;
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
    background: grey;
    border-radius: 90px;
    transition: 0.3s;
    border: 1px solid;
  }

  & input:checked + label {
    background: #34495e;
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
