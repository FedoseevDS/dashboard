import { useCallback, useEffect, useRef, useState } from 'react';
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
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(() => {
    setIsClick((i) => !i);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsClick(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Container ref={selectRef}>
      <Label>{name}</Label>
      {valueServer && (
        <SelectForm isClick={isClick}>
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
        <SelectForm isClick={isClick}>
          <button onClick={handleSelect}>
            <div>{valueChart || placeholder}</div>
            <GoChevronDown />
          </button>
          {isClick && (
            <DropDown>
              {config?.map((i, index) => (
                <button
                  key={i.name + index}
                  onClick={(e) => {
                    setIsClick(false);
                    if (onChangeChart) onChangeChart(e);
                  }}
                >
                  {i.name}
                </button>
              ))}
            </DropDown>
          )}
        </SelectForm>
      )}
      {valueStock && (
        <SelectForm isClick={isClick}>
          <button onClick={handleSelect}>
            <div>{!valueStock.length ? placeholder : valueStock.join(', ')}</div>
            <GoChevronDown />
          </button>
          {isClick && config.length > 0 && (
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
