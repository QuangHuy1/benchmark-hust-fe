import { Box, Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { MENU_DATA } from "./menu.data";
import MenuItem from "./menu.item";
import {showSidebarAtom} from "../../../recoil";

const Menu = () => {
  const showSidebar = useRecoilValue(showSidebarAtom);

  return (
    <Flex direction="column" w="full">
      {MENU_DATA.map((frame) => {
        const { menu, section } = frame;
        return (
          <Box key={section}>
            <Text
              textAlign={showSidebar ? "left" : "center"}
              textTransform="uppercase"
              color="#282828"
              fontSize={13}
              px={5}
            >
              {showSidebar ? section : "..."}
            </Text>
            <Flex direction="column">
              {menu.map((item) => (
                <MenuItem key={item.title} item={item} />
              ))}
            </Flex>
          </Box>
        );
      })}
    </Flex>
  );
};

export default Menu;
