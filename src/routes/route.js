import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import NotFound404 from "../page/404/404";
import ErrorFallback from "../page/layout/error-fallback";
import Main from "../page/layout/main";
import Home from "../page/layout/home";

const AppRoute = () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Routes>
                <Route element={<Main />}>
                    <Route index element={<Home />} />
                    <Route path="/danh-gia-tu-duy" element={<Home />} />
                    <Route path="/school/:id" element={<Home />} />
                    <Route path="/school" element={<Home />} />
                    <Route path="/major/:id" element={<Home />} />
                    <Route path="/major" element={<Home />} />
                    <Route path="/score" element={<Home />} />
                    <Route path="*" element={<NotFound404 />} />
                </Route>
            </Routes>
        </ErrorBoundary>
    );
};

export default AppRoute;
