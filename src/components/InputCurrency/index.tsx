import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

// import ReactInputMask from 'react-input-mask';
import { Container, Content, Error } from './styles';

import { cep, currency } from './masks';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  fontSize?: string;
  align?: string;
  mask: 'cep' | 'currency';
}

const InputCurrency: React.FC<InputProps> = ({
  mask,
  align,
  fontSize,
  placeholder,
  name,
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      // executa o código
      if (mask === 'cep') {
        cep(e);
      }
      if (mask === 'currency') {
        currency(e);
      }
    },
    [mask],
  );

  return (
    <Container>
      <h5>{placeholder}</h5>
      <Content
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
        fontSize={fontSize || undefined}
        align={align || undefined}
      >
        {Icon && <Icon size={16} />}
        <input
          onKeyUp={handleKeyUp}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle color="c53030" size={16} />
          </Error>
        )}
      </Content>
    </Container>
  );
};

export default InputCurrency;
