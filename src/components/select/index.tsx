import { useCallback, useState } from 'react';
import { GoChevronDown } from 'react-icons/go';

import { Container, DropDown, Label, SelectForm } from './styles';

import { SelectProps } from './types';

const Select = ({
  config,
  name,
  onChangeChart,
  onChangeServer,
  onChangeStock,
  placeholder,
  valueChart,
  valueServer,
  valueStock,
}: SelectProps) => {
  const [isClick, setIsClick] = useState<boolean>(false);

  const handleSelect = useCallback(() => {
    setIsClick((i) => !i);
  }, []);

  return (
    <Container>
      <Label>{name}</Label>
      {valueServer && (
        <SelectForm>
          <button onClick={handleSelect}>
            <div>{!valueServer.length ? placeholder : valueServer.join(', ')}</div>
            <GoChevronDown />
          </button>
          {isClick && (
            <DropDown>
              {config?.map((i, index) => (
                <button
                  key={i.name + index}
                  onClick={onChangeServer}
                >
                  {i.name}
                </button>
              ))}
            </DropDown>
          )}
        </SelectForm>
      )}
      {valueChart && (
        <SelectForm>
          <button onClick={handleSelect}>
            <div>{valueChart || placeholder}</div>
            <GoChevronDown />
          </button>
          {isClick && (
            <DropDown>
              {config?.map((i, index) => (
                <button
                  key={i.name + index}
                  onClick={onChangeChart}
                >
                  {i.name}
                </button>
              ))}
            </DropDown>
          )}
        </SelectForm>
      )}
      {valueStock && (
        <SelectForm>
          <button onClick={handleSelect}>
            <div>{!valueStock.length ? placeholder : valueStock.join(', ')}</div>
            <GoChevronDown />
          </button>
          {isClick && (
            <DropDown>
              {config?.map((i, index) => (
                <div key={i.name + index}>
                  <span>{`Сервер ${i.name}`}:</span>
                  <button onClick={onChangeStock}>{i.params?.asset || i.params?.symbol}</button>
                </div>
              ))}
            </DropDown>
          )}
        </SelectForm>
      )}
    </Container>
  );
};

export default Select;
