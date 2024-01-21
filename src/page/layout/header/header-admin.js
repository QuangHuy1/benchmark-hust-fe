import {Button, Flex, Heading, Icon, useMediaQuery} from "@chakra-ui/react";
import { useCallback } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import UserInfo from "./user-info";
import {showSidebarAtom} from "../../recoil";
import BreadCrumb from "./breadcrumb/breadcrumb";

const HeaderAdmin = () => {
  const isMobileAndTablet = useMediaQuery("(max-width: 992px)");
  const setShowSidebar = useSetRecoilState(showSidebarAtom);

  const onToggleSidebar = useCallback(
    () => setShowSidebar((prev) => !prev),
    [setShowSidebar],
  );

  return (
    <Flex
      pos="sticky"
      top={0}
      left={0}
      bg={isMobileAndTablet ? "main.0" : "#FFF"}
      zIndex={100}
      w="full"
      h="64px"
      borderBottom={{ xs: "none", lg: "1px solid #e6e6e6" }}
      px={{ xs: 4, lg: 10 }}
      justify="space-between"
      align="center"
    >
      {isMobileAndTablet ? (
        <Flex w="full" align="center" justify="space-between">
          <Button
            onClick={onToggleSidebar}
            bgColor="transparent"
            p={0}
            minW={0}
            minH={0}
            _hover={{ bgColor: "transparent" }}
            _active={{ bgColor: "transparent" }}
          >
            <Icon as={HiOutlineMenu} color="#ccc" fontSize={28} />
          </Button>

          <Link to="/">
            <Heading as="h3" fontSize={20} color="#e6e6e6">
              Hust Benchmark
            </Heading>
          </Link>

          <UserInfo />
        </Flex>
      ) : (
        <>
          <BreadCrumb />
          <UserInfo />
        </>
      )}
    </Flex>
  );
};

export default HeaderAdmin;
