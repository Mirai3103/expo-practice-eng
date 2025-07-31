import React from 'react';
import { Text, Pressable } from 'react-native';
import theme from '~/theme';
import { cn } from '~/utils/tailwind';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  type?: 'fill' | 'outline' | 'link';
  disabled?: boolean;
  style?: any; // changed from ViewStyle to any for compatibility
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  type = 'fill',
  disabled = false,
  style,
}) => {
  const buttonClass = cn(
    'flex-row items-center justify-center rounded-full active:bg-brand-orange100 active:text-gray-white',
    type === 'fill' && [disabled ? 'bg-gray disabled:opacity-60' : 'bg-brand-orange100 active:bg-brand-orange100', 'py-4 px-6'],
    type === 'outline' && [
      'bg-transparent border border-solid',
      disabled ? 'border-gray' : 'border-brand-orange100',
      'py-4 px-6',
    ],
    type === 'link' && 'bg-transparent py-2 px-1'
  );

  const textClass = cn(
    'text-[16px] font-semibold font-[PlusJakartaSans_600SemiBold]',
    type === 'fill' && 'text-gray-white',
    (type === 'outline' || type === 'link') && (disabled ? 'text-gray' : 'text-brand-orange100')
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={buttonClass}
      style={style}
    >
      <Text className={textClass}>{title}</Text>
    </Pressable>
  );
};
