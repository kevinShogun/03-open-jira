import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { UIProvider } from "context/ui";
import { EntriesProvider } from "context/entries";
 import { darkTheme, lightTheme } from "themes";
import "@/styles/globals.css";
import { SnackbarProvider } from "notistack";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SnackbarProvider maxSnack={3}>
			<EntriesProvider>
				<UIProvider>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</UIProvider>
			</EntriesProvider>
		</SnackbarProvider>
	);
}
