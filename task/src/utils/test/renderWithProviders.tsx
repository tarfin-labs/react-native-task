import React from "react";
import renderer, {
  ReactTestRenderer,
  TestRendererOptions,
} from "react-test-renderer";

import Providers from "./Providers";

const renderWithProviders = (
  children: React.ReactElement,
  options?: TestRendererOptions
): ReactTestRenderer =>
  renderer.create(<Providers>{children}</Providers>, options);

export default renderWithProviders;
