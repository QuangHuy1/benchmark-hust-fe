import {Flex, Icon} from "@chakra-ui/react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {tokenState, userProfileState} from "../recoil";
import {useCallback} from "react";
import {Dropdown, Space} from "antd";
import {DownOutlined} from '@ant-design/icons';
import Login from "./login";
import {MdAccountCircle} from "react-icons/md";

const DropdownLogin = () => {
    const setToken = useSetRecoilState(tokenState);
    const onLogout = useCallback(() => {
        setToken("");
        window.location.href = "/";
    }, [setToken]);
    const userProfile = useRecoilValue(userProfileState);

    const items = [
        {
            key: '1',
            label: (
                <Flex onClick={() => window.location.href = "/admin"}>
                    Quản lý
                </Flex>
            ),
        },
        {
            key: '2',
            label: (
                <Flex onClick={onLogout}>
                    Đăng xuất
                </Flex>
            ),
        },
    ];

    return (

        <Flex w={'40%'} justifyContent={"end"} alignItems={"center"}>
            <Dropdown
                className={'dropdown-login'}
                menu={{
                    items,
                }}
                trigger={['click']}
            >
                <Flex className={"_main_btn_login_"}>
                    <Flex className={"_btn_login_"}
                          mr={20}
                    >
                        {userProfile ? userProfile?.fullName : 'Đăng nhập'}
                    </Flex>
                    <Icon fontSize={26} cursor={"pointer"} as={MdAccountCircle}/>
                </Flex>
            </Dropdown>
        </Flex>
    )
}

export default DropdownLogin;