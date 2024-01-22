import { Box, Flex } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
    BODY_PADDING,
    DISABLE_ROUTE_PORTAL,
    MAIN_PADDING_X,
} from "../../utils/const";
import {showSidebarAtom, tokenState, userProfileState} from "../recoil";
import {showToast, useMediaQuery} from "../../utils/helper";
import ErrorFallback from "./error-fallback";
import Section from "./section/section";
import BreadCrumb from "./header/breadcrumb/breadcrumb";
import HeaderAdmin from "./header/header-admin";
import Sidebar from "./sidebar/sidebar";
import {serviceHust} from "../../utils/service";

const MainAdmin = () => {
    const location = useLocation();
    const [showSidebar, setShowSidebar] = useRecoilState(showSidebarAtom);
    const token = useRecoilValue(tokenState);
    const isMobileAndTablet = useMediaQuery("(max-width: 992px)");
    const showBackground = !DISABLE_ROUTE_PORTAL.some((item) =>
        location.pathname.includes(item),
    );
    const setToken = useSetRecoilState(tokenState);
    const setUserProfile = useSetRecoilState(userProfileState);
    const onLogout = useCallback(() => {
        setToken("");
        setUserProfile("")
    }, [setToken, setUserProfile]);
    const onToggleSidebar = useCallback(
        () => setShowSidebar((prev) => !prev),
        [setShowSidebar],
    );

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
        <Flex flex={1} pos="relative">
            <Sidebar />
            {isMobileAndTablet && showSidebar && (
                <Box
                    onClick={onToggleSidebar}
                    pos="absolute"
                    w="full"
                    h="full"
                    bgColor="main.1"
                    opacity={0.6}
                    zIndex={150}
                />
            )}
            <Flex
                flex={1}
                ml={isMobileAndTablet ? 0 : showSidebar ? 80 : 0}
                transitionDuration="300ms"
            >
                <main style={{ width: "100%" }}>
                    <HeaderAdmin />

                    {isMobileAndTablet && <BreadCrumb />}

                    <Box
                        bgColor="#EEF0F8"
                        px={showBackground ? BODY_PADDING : { xs: 1, lg: 2 }}
                        py={showBackground ? BODY_PADDING : { xs: 1, md: 3 }}
                    >
                        <Box
                            bgColor={showBackground ? "#FFF" : "transparent"}
                            minH={{
                                xs: "calc(100vh - 71px)",
                                md: "calc(100vh - 85px)",
                                lg: "calc(100vh - 134px)",
                            }}
                            borderRadius={4}
                        >
                            <Section />
                            <Box px={MAIN_PADDING_X} py={{ xs: 5, lg: 6 }}>
                                <ErrorBoundary FallbackComponent={ErrorFallback}>
                                    <Outlet />
                                </ErrorBoundary>
                            </Box>
                        </Box>
                    </Box>
                </main>
            </Flex>
        </Flex>
    );
};

export default MainAdmin;
