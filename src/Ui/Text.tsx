import React from 'react';
import { Text, View } from 'react-native';

interface TextProps {
  fontWeight?: 'bold' | 'semibold' | 'medium' | 'regular' | 'light';
  fontSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 't1' | 't2' | 'body' | 'caption';
  text: string;
  color?: string;
  no_wrap?: boolean;
}

const TextUi: React.FC<TextProps> = ({ fontWeight = 'regular', fontSize = 'body', text, color = 'text-grayscale-500', no_wrap }) => {
  const getFontSize = (size: string) => {
    switch (size) {
      case 'h1': return 48;
      case 'h2': return 40;
      case 'h3': return 33;
      case 'h4': return 28;
      case 'h5': return 23;
      case 't1': return 19;
      case 't2': return 16;
      case 'body': return 13;
      default: return 11;
    }
  };

  const getFontWeight = (weight: string) => {
    switch (weight) {
      case 'bold': return 700;
      case 'semibold': return 600;
      case 'medium': return 500;
      case 'regular': return 400;
      case 'light': return 300;
      default: return 400;
    }
  };

  return (
    <View>
      <Text
        className={`${no_wrap && 'text-nowrap'} ${color}`}
        style={{
          fontSize: getFontSize(fontSize),
          fontWeight: getFontWeight(fontWeight),
          // color: color || 'inherit'
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default TextUi;
