/* eslint-disable import/export */
import React from "react";
import { render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18nTestHelper";

const Providers: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  // @ts-ignore
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: Providers,
    ...options,
  });
import "@testing-library/jest-dom";
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
