import background from "../../assets/images/background.png";
import {Flex} from "@chakra-ui/react";
import Header from "./header";
import ViewWithSchool from "../component/view/view-with-school";
import {useEffect} from "react";
import ViewWithMajor from "../component/view/view-with-major";
import ViewWithScore from "../component/view/view-with-score";
import {useRecoilState} from "recoil";
import {typeState, typeTestState} from "../recoil";
import {useNavigate} from "react-router-dom";
import ViewWithRecommend from "../component/view/view-with-recommend";

const Home = () => {
    const navigate = useNavigate();
    const [type, setType] = useRecoilState(typeState);
    const [typeTest, setTypeTest] = useRecoilState(typeTestState);

    useEffect(() => {
        if (window.location.pathname.startsWith("/danh-gia-tu-duy")) {
            setTypeTest(1);
        } else if (window.location.pathname.startsWith("/school/")) {
            setType(3);
        } else if (window.location.pathname.startsWith("/school")) {
            setType(0);
        } else if (window.location.pathname.startsWith("/major/")) {
            setType(4);
        } else if (window.location.pathname.startsWith("/major")) {
            setType(1);
        } else if (window.location.pathname.startsWith("/score")) {
            setType(2);
        } else if (window.location.pathname.startsWith("/recommend")) {
            setType(5);
        }
    }, [window.location.pathname]);

    const changeType = (value) => {
        if (value === 1) {
            navigate("/major");
        }
        if (value === 0) {
            navigate("/school")
        }
        if (value === 2) {
            navigate("/score")
        }
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
                                  p={10}
                                  border={"1px solid #ababab"}
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                  onClick={() => changeType(0)}
                                  className={type === 0 || type === 3 ? "_view_enable_" : "_view_disable_"}>Xem theo trường</Flex>
                            <Flex w={"100%"}
                                  p={10}
                                  borderTop={"1px solid #ababab"}
                                  borderBottom={"1px solid #ababab"}
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                  onClick={() => changeType(1)}
                                  className={type === 1 || type === 4 ? "_view_enable_" : "_view_disable_"}>Xem theo ngành</Flex>
                            <Flex w={"100%"}
                                  p={10}
                                  border={"1px solid #ababab"}
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                  onClick={() => changeType(2)}
                                  className={type === 2 ? "_view_enable_" : "_view_disable_"}>Xem theo điểm</Flex>
                        </Flex>
                        {type === 0 && <ViewWithSchool/>}
                        {type === 1 && <ViewWithMajor/>}
                        {type === 2 && <ViewWithScore/>}
                        {type === 3 && <ViewWithScore/>}
                        {type === 4 && <ViewWithScore/>}
                        {type === 5 && <ViewWithRecommend/>}
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