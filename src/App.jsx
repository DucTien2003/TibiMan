import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "@/components/specific/ScrollToTop";
import GetAuthData from "@/components/specific/GetAuthData";
import AlertMessage from "@/components/common/AlertMessage";
import { publicRoutes } from "@/routes";
import { StoreProvider } from "@/store";
import { DefaultLayout } from "@/layouts";

function App() {
  return (
    <StoreProvider>
      <Router>
        <ScrollToTop />
        <GetAuthData />
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Layout = route.layout || DefaultLayout;
              const Page = route.component;
              const headerAbsolute = route.headerAbsolute || false;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout headerAbsolute={headerAbsolute}>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
            ;
          </Routes>
        </div>

        <AlertMessage />
      </Router>
    </StoreProvider>
  );
}
export default App;
