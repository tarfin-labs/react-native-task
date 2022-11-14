import React from "react";
import { Text } from "react-native";

import renderWithProviders from "../../utils/test/renderWithProviders";
import Screen from "./Screen";

describe("<Screen />", () => {
  it("renders correctly", () => {
    const ScreenWithText = () => (
      <Screen>
        <Text>test</Text>
      </Screen>
    );

    const toJson: any = renderWithProviders(<ScreenWithText />).toJSON();

    expect(toJson.props.backgroundColor).toBe("#333B65");

    expect(toJson).toMatchSnapshot();
  });
});
