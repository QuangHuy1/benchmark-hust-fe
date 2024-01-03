import {Flex} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {serviceHust} from "../../utils/service";

const ViewWithMajor = () => {
    const [falculties, setFaculties] = useState([]);

    useEffect(() => {
        serviceHust.findAllFaculty().then(res => {

        })
    }, []);

    const column = [
        "Điện tử",
        "Viễn thông",
        "Công nghệ",
        "Thông tin"
    ]

    const row = [
        column
    ]

    return (
        <Flex w={"100%"} flexDir={"column"}>
            {row.map(r => (
                <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                    {r.map(c => (
                        <Flex w={"22%"}
                              className={"_btn_choose_major_"}
                              borderRadius={5}
                              fontSize={16}
                              fontWeight={500}
                              padding={10}
                              background={"#F5F5F5"}
                              justifyContent={"center"}
                              alignItems={"center"}>
                            {c}
                        </Flex>
                    ))}
                </Flex>
            ))}
        </Flex>
    )
}

export default ViewWithMajor;

