import {
  Button,
  Flex,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure, useMediaQuery,
} from "@chakra-ui/react";
import ImgUserAvatar from "../../../../assets/images/user-avatar.png";
import { memo, useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {tokenState, userProfileState} from "../../../recoil";

const UserInfo = () => {
  const setToken = useSetRecoilState(tokenState);
  const userProfile = useRecoilValue(userProfileState);
  const onLogout = useCallback(() => setToken(""), [setToken]);
  const isMobileAndTablet = useMediaQuery("(max-width: 992px)");
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Popover placement="bottom-end" isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button
          h={{ xs: 10, lg: 14 }}
          gap={2.5}
          px={{ xs: 0, lg: 3 }}
          borderRadius={{ xs: "full", lg: 10 }}
          bgColor="#f7f7f8"
          border={{ xs: "none", lg: "1px solid #f2f2f2" }}
          _hover={{ bgColor: "#f2f2f2" }}
          onClick={onToggle}
        >
          <Image
            src=""
            fallbackSrc={ImgUserAvatar}
            boxSize={10}
            borderRadius="full"
          />
          {!isMobileAndTablet && (
            <Text as="span" fontWeight={600}>
              {userProfile?.fullName}
            </Text>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent w="150px" borderRadius={5} overflow="hidden">
        <Flex>
          <Button
            width="100%"
            bgColor="#FFFFFF"
            transitionDuration="250ms"
            color="black"
            onClick={onLogout}
            _hover={{ bgColor: "darkred", color: "#FFF" }}
          >
            Đăng xuất
          </Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

export default memo(UserInfo);
