import {
    Box,
    Flex,
    Heading,
    Image,
    ListItem,
    Text,
    UnorderedList,
} from "@chakra-ui/react";
import Logo from "../../assets/images/img.png";
import { Helmet } from "react-helmet";
import {useScrollTop} from "../../utils/helper";

const HomeAdmin = () => {
    useScrollTop();

    const INTRO_DATA = [
        {
            title: "Giới thiệu",
            content: 'Website Admin Hust Benchmark'
        },
        {
            title: "Công nghệ",
            content: 'React + Chakra UI + Recoil + React Router + React Query + Antd'
        },
        {
            title: "Tính năng",
            content: 'Thêm, sửa, xoá thông tin các trường, ngành, điểm chuẩn, ...'
        },
    ];

    return (
        <Flex direction="column">
            <Helmet>
                <title>Client Management Systems</title>
            </Helmet>
            <Box
                mt={{ xs: 5, md: 32 }}
                w={{ xs: "90%", md: "80%", lg: "50%" }}
                mx="auto"
            >
                <Flex align="center" gap={3}>
                    {/*<Image src={Logo} boxSize={16} />*/}
                    <Heading as="h2" fontSize={24} fontWeight={600} noOfLines={1}>
                        Hust Benchmark
                    </Heading>
                </Flex>

                <UnorderedList mt={20}>
                    {INTRO_DATA.map((item) => {
                        const { title, content } = item;
                        return (
                            <ListItem mb={5} key={title}>
                                <Flex>
                                    <Text
                                        fontWeight={600}
                                        as="span"
                                        fontSize={{ xs: 14, md: 16 }}
                                        w={{ xs: "30%", md: "25%" }}
                                    >
                                        {title}:
                                    </Text>{" "}
                                    <Text
                                        as="span"
                                        fontSize={{ xs: 14, md: 16 }}
                                        w={{ xs: "70%", md: "75%" }}
                                    >
                                        {content}
                                    </Text>
                                </Flex>
                            </ListItem>
                        );
                    })}
                </UnorderedList>
            </Box>
        </Flex>
    );
};

export default HomeAdmin;
