import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Note } from "./components/Note";
import { createGlobalStyle } from "styled-components";
import { MainRouter } from "./routes/MainRouter";
import { BrowserRouter } from "react-router-dom";
const theme = {
	colors: {
		neutral100: "#f5f5f5",
		neutral200: "#e0e0e0",
		neutral300: "#bdbdbd",
		neutral400: "#9e9e9e",
		neutral500: "#757575",
		neutral600: "#616161",
		neutral700: "#424242",
		neutral800: "#212121",
		neutral900: "#000000",

		primary: "#ff9d00",
	},
	fonts: {
		primary:
			"system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
	},
};
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
	font-family: ${(props) => props.theme.fonts.primary};
	color: ${(props) => props.theme.colors.neutral100};
  }
  body, html, #root{
	  background-color: ${(props) => props.theme.colors.neutral800};	
	  min-height: 100vh;
	  overflow-x: hidden;
  }`;

function App() {
	return (
		<ThemeProvider theme={theme}>
			<MainRouter />
			<GlobalStyle />
		</ThemeProvider>
	);
}

export default App;
