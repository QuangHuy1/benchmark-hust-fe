import {Flex, Icon} from "@chakra-ui/react";
import {IoMdHome} from "react-icons/io";
import {MdAccountCircle} from "react-icons/md";
import {useRecoilValue} from "recoil";
import {typeTestState} from "../recoil";
import {useNavigate} from "react-router-dom";
import Login from "../component/login";
import {useState} from "react";

const Header = () => {
    const typeTest = useRecoilValue(typeTestState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

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
                <Flex w={'40%'}
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
                </Flex>

                {/*Login*/}
                <Flex w={'40%'} justifyContent={"end"} alignItems={"center"}>
                    <Flex className={"_main_btn_login_"}>
                        <Flex className={"_btn_login_"}
                              mr={20}
                              onClick={showModal}
                        >
                            Đăng nhập
                        </Flex>
                        <Login isModalOpen={isModalOpen}
                               setIsModalOpen={setIsModalOpen}/>
                        <Icon fontSize={26} cursor={"pointer"} as={MdAccountCircle}/>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Header;