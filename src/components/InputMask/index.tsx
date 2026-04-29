import React, { useRef, useEffect, useCallback, useState } from 'react';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';
import { IconBaseProps } from 'react-icons';

import { useField } from '@unform/core';

import { Container, Content } from './styles';

interface InputMaskProps extends InputProps {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const InputMask: React.FC<InputMaskProps> = ({
  placeholder,
  name,
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, error, defaultValue } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(e => {
    const noSpecialCaracter = e.replace(/\D/g, '');
    // console.log(`resultado ${noSpecialCaracter}`);
    if (noSpecialCaracter !== '') {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
    setIsFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <h5>{placeholder}</h5>
      <Content isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
        {Icon && <Icon size={16} />}
        <ReactInputMask
          onFocus={handleInputFocus}
          onBlur={i => handleInputBlur(i.target.value)}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      </Content>
    </Container>
  );
};

export default InputMask;
