import React, { useState } from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';
import theme from '~/theme';
import { cn } from '~/utils/tailwind';

interface InputFieldProps extends TextInputProps {
  title: string;
  error?: boolean;
}

const Input: React.FC<InputFieldProps> = ({ title, error, value, onChangeText, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  const isFilled = Boolean(value);

  // Dynamic classes for border and text color
  const borderClass = cn(
    'border rounded-[10px] h-[48px] px-3 py-3 font-[PlusJakartaSans_400Regular] text-[16px]',
    error && 'border-semantic-error',
    !error && isFocused && 'border-brand-purple100',
    !error && !isFocused && isFilled && 'border-gray-white',
    !error && !isFocused && !isFilled && 'border-gray',
  );

  const labelClass = cn(
    'text-[14px] mb-1 font-medium font-[PlusJakartaSans_700Bold]',
    error && 'text-semantic-error',
    !error && isFocused && 'text-brand-purple100',
    !error && !isFocused && 'text-gray',
  );

  const inputTextClass = cn(
    error && 'text-semantic-error',
    !error && isFilled && 'text-gray-white',
    !error && !isFilled && 'text-text-black',
  );

  // Placeholder color logic
  const placeholderTextColor = error
    ? theme.colors.semantic.error
    : isFilled
    ? theme.colors.gray.white
    : theme.colors.text.black;

  return (
    <View className="mb-5">
      <Text className={labelClass}>{title}</Text>
      <TextInput
        {...rest}
        value={value}
        onChangeText={onChangeText}
        className={cn(borderClass, inputTextClass)}
        placeholderTextColor={placeholderTextColor}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default Input;