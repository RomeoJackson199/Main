import { View, Text } from 'react-native';
import React from 'react';

type Props = { title: string };

export const Screen: React.FC<Props> = ({ title, children }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text accessibilityRole="header">{title}</Text>
    {children}
  </View>
);
