import {Flex} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {serviceHust} from "../../utils/service";
import {useNavigate} from "react-router-dom";

const ViewWithMajor = () => {
    const navigate = useNavigate();
    const [faculties, setFaculties] = useState([]);

    useEffect(() => {
        serviceHust.findAllFaculty().then(res => {
            const listOfLists = [];
            const elementsPerSublist = 4;
            for (let i = 0; i < res.length; i += elementsPerSublist) {
                // Sử dụng slice để cắt list response thành các sublist mới
                const sublist = res.slice(i, i + elementsPerSublist);
                listOfLists.push(sublist);
            }
            setFaculties(listOfLists);
        })
    }, []);

    return (
        <Flex w={"100%"} flexDir={"column"}>
            {faculties.map(r => (
                <Flex mb={20} w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                    {r.map(c => (
                        <Flex w={"22%"}
                              h={100}
                              className={"_btn_choose_major_"}
                              borderRadius={5}
                              fontSize={16}
                              fontWeight={500}
                              padding={10}
                              background={"#F5F5F5"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              onClick={() => navigate("/major/" + c.id)}
                        >
                            {c.name}
                        </Flex>
                    ))}
                </Flex>
            ))}
        </Flex>
    )
}

export default ViewWithMajor;

