import {Flex, Icon} from "@chakra-ui/react";
import {IoMdHome} from "react-icons/io";
import {MdAccountCircle} from "react-icons/md";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {tokenState, typeTestState, userProfileState} from "../recoil";
import Login from "../component/login";
import {useCallback, useState} from "react";
import DropdownLogin from "../component/dropdown-login";

const Header = () => {
    const typeTest = useRecoilValue(typeTestState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userProfile = useRecoilValue(userProfileState);

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <Flex w={"100%"}
              paddingTop={10}
              paddingBottom={10}
              mb={100}
              justifyContent={"center"}
              alignItems={"center"}
              background={"#FAFAFA"}
        >
            <Flex w={'80%'} h={'100%'} justifyContent={"space-between"} alignItems={"center"}>
                {/*Icon*/}
                <Flex flexDir={"column"}
                      justifyContent={"center"}
                      alignItems={"start"}
                      w={'20%'}>
                    <Flex fontSize={24} fontWeight={1000} color={"darkred"}>
                        HUST
                    </Flex>
                    <Flex fontSize={16} fontWeight={700} color={'#282828'}>
                        Benchmark
                    </Flex>
                </Flex>

                {/*Menu*/}
                <Flex w={'80%'}
                      justifyContent={"center"}
                      alignItems={"center"}>
                    <Icon fontSize={26} cursor={"pointer"} color={"darkred"} as={IoMdHome}/>
                    <Flex className={typeTest === 0 ? "_menu_text_enable" : "_menu_text_"}
                          onClick={() => window.location.href = "/"}
                    >
                        Điểm thi THPTQG
                    </Flex>
                    <Flex className={typeTest === 1 ? "_menu_text_enable" : "_menu_text_"}
                          onClick={() => window.location.href = "/danh-gia-tu-duy"}
                    >
                        Điểm thi đánh giá tư duy
                    </Flex>
                    <Flex className={typeTest === 2 ? "_menu_text_enable" : "_menu_text_"}
                          onClick={() => window.location.href = "/recommend"}
                    >
                        Gợi ý ngành học
                    </Flex>
                </Flex>

                {/*Login*/}
                {userProfile ?
                    <DropdownLogin/> :
                    <Flex w={'40%'} justifyContent={"end"} alignItems={"center"}>
                        <Flex className={"_main_btn_login_"} onClick={showModal}>
                            <Flex className={"_btn_login_"}
                                  mr={20}
                            >
                                {userProfile ? userProfile?.fullName : 'Đăng nhập'}
                            </Flex>
                            <Icon fontSize={26} cursor={"pointer"} as={MdAccountCircle}/>
                        </Flex>
                        <Login isModalOpen={isModalOpen}
                               setIsModalOpen={setIsModalOpen}/>
                    </Flex>
                }
            </Flex>
        </Flex>
    )
}

export default Header;