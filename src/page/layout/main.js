import {Outlet} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallback from "./error-fallback";
import {serviceHust} from "../../utils/service";
import {showToast} from "../../utils/helper";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {tokenState, userProfileState} from "../recoil";
import {useCallback, useEffect} from "react";

const Main = () => {
    const token = useRecoilValue(tokenState);
    const setToken = useSetRecoilState(tokenState);
    const setUserProfile = useSetRecoilState(userProfileState);
    const onLogout = useCallback(() => {
        setToken("");
        setUserProfile("")
    }, [setToken, setUserProfile]);

    const validateToken = () => {
        if (!token) return;
        serviceHust
            .getUser()
            .then((response) => {
                setUserProfile(response);
            })
            .catch((err) => {
                showToast({
                    content: err?.message,
                    status: 'error'
                })
                onLogout();
                window.location.href = "/";
            });
    };

    useEffect(() => {
        validateToken();
    }, [token]);

    return (
        <main>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Outlet/>
            </ErrorBoundary>
        </main>
    )

}

export default Main;