import {Outlet} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallback from "./error-fallback";
import Home from "./home";

const Main = () => {
    return (
        <main>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Outlet/>
            </ErrorBoundary>
        </main>
    )

}

export default Main;