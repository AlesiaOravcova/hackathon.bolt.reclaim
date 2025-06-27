import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  disabled = false,
  variant = 'default',
  size = 'default',
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    if (variant === 'outline') {
      baseStyle.push(styles.outlineButton);
    } else if (variant === 'ghost') {
      baseStyle.push(styles.ghostButton);
    } else {
      baseStyle.push(styles.defaultButton);
    }
    
    if (size === 'sm') {
      baseStyle.push(styles.smallButton);
    } else if (size === 'lg') {
      baseStyle.push(styles.largeButton);
    }
    
    if (disabled) {
      baseStyle.push(styles.disabledButton);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText];
    
    if (variant === 'outline') {
      baseStyle.push(styles.outlineButtonText);
    } else if (variant === 'ghost') {
      baseStyle.push(styles.ghostButtonText);
    } else {
      baseStyle.push(styles.defaultButtonText);
    }
    
    if (size === 'sm') {
      baseStyle.push(styles.smallButtonText);
    } else if (size === 'lg') {
      baseStyle.push(styles.largeButtonText);
    }
    
    if (disabled) {
      baseStyle.push(styles.disabledButtonText);
    }
    
    return baseStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[...getButtonStyle(), style]}
      activeOpacity={0.8}
    >
      <Text style={[...getTextStyle(), textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultButton: {
    backgroundColor: '#2563EB',
  },
  outlineButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    height: 56,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  defaultButtonText: {
    color: '#FFFFFF',
  },
  outlineButtonText: {
    color: '#1F2937',
  },
  ghostButtonText: {
    color: '#1F2937',
  },
  smallButtonText: {
    fontSize: 14,
  },
  largeButtonText: {
    fontSize: 18,
  },
  disabledButtonText: {
    opacity: 0.7,
  },
});