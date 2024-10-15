import { createTheme, MantineProvider } from "@mantine/core";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'
import '@mantine/carousel/styles.css'
import MainLayout from "./components/layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./components/common/ErrorPage";
import SignupPage from "./pages/SignUpPage";
import AuctionsPage from "./pages/AuctionsPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AuctionDetailsPage from "./pages/AuctionDetailsPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path:"auctions", element: <AuctionsPage/>},
      { path: "auctions/:id", element: <AuctionDetailsPage/>},
      { path:"contact", element: <ContactPage/>},
      { path:"about", element: <AboutPage />},
    ],
  },
  { path: "register", element: <SignupPage /> },
])

const theme = createTheme({
  fontFamily: "Saira, sans-serif",
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
});

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App;
