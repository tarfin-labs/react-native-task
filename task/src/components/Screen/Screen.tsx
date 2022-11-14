import React from "react";
import { View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

import { useThemeContext } from "../../contexts/ThemeProvider/hooks";
import { ScreenProps } from "./screenProps.interface";

const Container = styled(View)<{
  backgroundColor: string;
  padding: number;
}>`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
  padding: ${(props) => moderateScale(props.padding)}px;
`;

export default function Screen({ children }: ScreenProps) {
  const theme = useThemeContext();

  return (
    <Container padding={theme.padding.m} backgroundColor={theme.colors.primary}>
      {children}
    </Container>
  );
}
