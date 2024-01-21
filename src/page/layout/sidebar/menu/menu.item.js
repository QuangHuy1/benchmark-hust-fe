import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Icon,
  Text, useMediaQuery,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import {showSidebarAtom} from "../../../recoil";

const MenuItem = ({ item, level = 1 }) => {
  const { route, icon, title, subs, hidden } = item;
  const [showSubMenu, setShowSubMenu] = useState(false);
  const location = useLocation();
  const isActive = route && route === location.pathname;
  const [showSidebar, setShowSidebar] = useRecoilState(showSidebarAtom);
  const isMobileAndTablet = useMediaQuery("(max-width: 992px)");

  const onToggleShowMenu = useCallback(
    () => setShowSubMenu((prev) => !prev),
    [setShowSubMenu],
  );

  const onClickRoute = useCallback(() => {
    if (!isMobileAndTablet) {
      return;
    }
    setShowSidebar((prev) => !prev);
  }, [isMobileAndTablet, setShowSidebar]);

  useEffect(() => {
    if (!isActive) {
      setShowSubMenu(isActive);
    }
  }, [isActive]);

  if (hidden) {
    return null;
  }

  if (route && !subs) {
    return (
      <Link to={route} key={title} onClick={onClickRoute}>
        <Flex
          bgColor={isActive ? "main.2" : "main.1"}
          _hover={{ bgColor: "main.2" }}
          pl={5}
          pr={3.5}
          h="49px"
          transitionDuration="250ms"
          data-group
          justify={showSidebar ? "flex-start" : "center"}
        >
          <Flex align="center" gap={showSidebar ? 3 : 0}>
            <Flex
              w="18px"
              justify="center"
              pl={icon || !showSidebar ? 0 : level === 3 ? 8 : 4}
              opacity={level === 3 && showSidebar ? 0 : 1}
              visibility={level === 3 && showSidebar ? "hidden" : "visible"}
            >
              {!showSidebar && level === 3 && <Text color="#282828">...</Text>}
              {!!icon ? (
                <Icon
                  as={icon}
                  color={showSubMenu || isActive ? "darkred" : "#282828"}
                  _groupHover={{ color: "darkred" }}
                  transitionDuration="250ms"
                />
              ) : (
                <Box
                  as="span"
                  w="4px"
                  h="4px"
                  display={level === 3 && !showSidebar ? "none" : "block"}
                  borderRadius="full"
                  bgColor={isActive ? "darkred" : "#282828"}
                  _groupHover={{ bgColor: "darkred" }}
                />
              )}
            </Flex>
            <Text
              noOfLines={1}
              as="span"
              color={isActive ? "darkred" : "#282828"}
              _groupHover={{ color: "darkred" }}
              transitionDuration="250ms"
            >
              {showSidebar ? title : ""}
            </Text>
          </Flex>
        </Flex>
      </Link>
    );
  }

  return (
    <Accordion key={title} allowToggle>
      <AccordionItem border="none">
        <AccordionButton
          h="49px"
          pl={5}
          pr={3.5}
          bgColor="main.1"
          _hover={{ bgColor: "main.2" }}
          transitionDuration="250ms"
          data-group
          justifyContent={showSidebar ? "space-between" : "center"}
          onClick={onToggleShowMenu}
        >
          <Flex align="center" gap={showSidebar ? 3 : 0}>
            <Flex w="18px" pl={icon || !showSidebar ? 0 : 4} justify="center">
              {!!icon ? (
                <Icon
                  as={icon}
                  color="#a2a3b7"
                  _groupHover={{ color: "darkred" }}
                  transitionDuration="250ms"
                />
              ) : (
                <Box
                  as="span"
                  w="4px"
                  h="4px"
                  borderRadius="full"
                  bgColor="#a2a3b7"
                  _groupHover={{ bgColor: "darkred" }}
                />
              )}
            </Flex>
            <Text
              as="span"
              noOfLines={1}
              color="#282828"
              _groupHover={{ color: "darkred" }}
              transitionDuration="250ms"
            >
              {showSidebar ? title : "..."}
            </Text>
          </Flex>
          {showSidebar && (
            <Icon
              ml={2}
              as={FaChevronRight}
              color="#a2a3b7"
              fontSize={12}
              transform={showSubMenu ? "rotate(90deg)" : undefined}
              _groupHover={{ color: "darkred" }}
              transitionDuration="250ms"
            />
          )}
        </AccordionButton>
        <AccordionPanel p={0} pl={0}>
          {subs.map((itemSub) => {
            return (
              <MenuItem item={itemSub} key={itemSub.title} level={level + 1} />
            );
          })}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default MenuItem;
