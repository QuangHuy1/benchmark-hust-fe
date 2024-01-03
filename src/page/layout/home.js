import background from "../../assets/images/background.png";
import {Flex} from "@chakra-ui/react";
import Header from "./header";
import ViewWithSchool from "../component/view-with-school";
import {useEffect} from "react";
import ViewWithMajor from "../component/view-with-major";
import ViewWithScore from "../component/view-with-score";
import {useRecoilState} from "recoil";
import {typeState, typeTestState} from "../recoil";

const Home = () => {
    const [type, setType] = useRecoilState(typeState);
    const [typeTest, setTypeTest] = useRecoilState(typeTestState);

    useEffect(() => {
        if (window.location.pathname.startsWith("/danh-gia-tu-duy")) {
            setTypeTest(1);
        }
    }, []);

    const changeType = (value) => {
        setType(value);
    }

    return (
        <Flex flexDir={"column"} pos={"relative"}>
            <div className={"_display_"}>
                <Header/>
                <div className={"_text_title_"}>
                    Tra cứu điểm chuẩn Đại học Bách Khoa Hà Nội
                </div>
                {typeTest === 0 &&
                    <div className={"_text_title_1_"}>
                        Điểm thi tốt nghiệp THPTQG
                    </div>
                }
                {typeTest === 1 &&
                    <div className={"_text_title_1_"}>
                        Điểm thi đánh giá tư duy
                    </div>
                }
                <Flex height={"fit-content"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      mt={30}
                      w={"100%"}>
                    <Flex height={"fit-content"}
                          p={20}
                          flexDir={"column"}
                          background={"#FFF"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          borderRadius={10}
                          w={"80%"}>
                        <Flex w={"100%"}
                              mb={30}
                              alignItems={"center"}
                              justifyContent={"space-between"}>
                            <Flex w={"100%"}
                                  p={5}
                                  border={"1px solid #ababab"}
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                  onClick={() => changeType(0)}
                                  className={type === 0 ? "_view_enable_" : "_view_disable_"}>Xem theo trường</Flex>
                            <Flex w={"100%"}
                                  p={5}
                                  borderTop={"1px solid #ababab"}
                                  borderBottom={"1px solid #ababab"}
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                  onClick={() => changeType(1)}
                                  className={type === 1 ? "_view_enable_" : "_view_disable_"}>Xem theo ngành</Flex>
                            <Flex w={"100%"}
                                  p={5}
                                  border={"1px solid #ababab"}
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                  onClick={() => changeType(2)}
                                  className={type === 2 ? "_view_enable_" : "_view_disable_"}>Xem theo điểm</Flex>
                        </Flex>
                        {type === 0 && <ViewWithSchool/>}
                        {type === 1 && <ViewWithMajor/>}
                        {type === 2 && <ViewWithScore/>}
                    </Flex>

                </Flex>
            </div>
            <Flex className={'_img_bg_'}>
                <img className={"_img_bg_1_"} src={background} alt={background}/>
            </Flex>
        </Flex>
    )
}

export default Home;