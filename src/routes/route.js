import {ErrorBoundary} from 'react-error-boundary';
import {Route, Routes} from 'react-router-dom';
import NotFound404 from "../page/404/404";
import ErrorFallback from "../page/layout/error-fallback";
import Main from "../page/layout/main";
import Home from "../page/layout/home";
import MainAdmin from "../page/layout/main-admin";
import HomeAdmin from "../page/layout/home-admin";
import ViewWithScore from "../page/component/view-with-score";
import AdminViewScore from "../page/component/admin/score/admin-view-score";

const AppRoute = () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Routes>
                <Route element={<Main/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/danh-gia-tu-duy" element={<Home/>}/>
                    <Route path="/school/:id" element={<Home/>}/>
                    <Route path="/school" element={<Home/>}/>
                    <Route path="/major/:id" element={<Home/>}/>
                    <Route path="/major" element={<Home/>}/>
                    <Route path="/score" element={<Home/>}/>
                    <Route path="*" element={<NotFound404/>}/>
                </Route>

                <Route path="/admin" element={<MainAdmin/>}>
                    <Route index element={<HomeAdmin/>}/>
                    <Route path="score" element={<AdminViewScore/>}/>
                </Route>
            </Routes>
        </ErrorBoundary>
    );
};

export default AppRoute;
