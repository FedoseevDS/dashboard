import { useCallback, useMemo, useRef, useState } from 'react';
import { GoChevronDown } from 'react-icons/go';

import { useClickOutside } from 'hooks/useClickOutside';

import { Container, DropDown, Label, SelectForm } from './styles';

import { SelectProps } from './types';

const Select = ({ label, onChange, options, placeholder, stock = false, value }: SelectProps) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useClickOutside(selectRef, () => setIsClick(false));

  const showPlaceholder = useMemo(() => {
    if (!placeholder) {
      return value;
    }
    if (value.length > 0 && Array.isArray(value)) {
      return value?.join(', ');
    }

    return placeholder;
  }, [placeholder, value]);

  const showDropDown = useMemo(() => {
    return (
      <DropDown>
        {options?.map((i, index) => {
          if (stock) {
            return (
              <div key={i.name + index}>
                <span>{`Сервер ${i.name}`}:</span>
                <button onClick={onChange}>{i.params?.asset || i.params?.symbol}</button>
              </div>
            );
          }
          if (i.url && !stock) {
            return (
              <button
                key={i.name + index}
                onClick={onChange}
              >
                {i.name}
              </button>
            );
          }

          return (
            <button
              key={i.name + index}
              onClick={(e) => {
                setIsClick(false);
                if (onChange) onChange(e);
              }}
            >
              {i.name}
            </button>
          );
        })}
      </DropDown>
    );
  }, [onChange, options, stock]);

  const handleSelect = useCallback(() => {
    setIsClick((i) => !i);
  }, []);

  return (
    <Container ref={selectRef}>
      <Label>{label}</Label>
      <SelectForm isClick={isClick}>
        <button onClick={handleSelect}>
          <div>{showPlaceholder}</div>
          <GoChevronDown />
        </button>
        {isClick && showDropDown}
      </SelectForm>
    </Container>
  );
};

export default Select;
