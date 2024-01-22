import {useState} from "react";
import {Flex} from "@chakra-ui/react";
import {Button} from "antd";
import ModalCreateSchool from "./modal-create-school";
import ViewWithSchool from "../../view/view-with-school";

const AdminViewSchool = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <Flex flexDir={"column"}>
            <Flex width={'100%'} justifyContent={"end"}>
                <Button
                    type="primary"
                    onClick={showModal}
                    style={{float: "right", marginBottom: 10, width: "fit-content"}}
                >
                    Thêm mới
                </Button>
            </Flex>
            <ViewWithSchool/>
            <ModalCreateSchool isModalOpen={isModalOpen}
                               setIsModalOpen={setIsModalOpen}/>
        </Flex>
    )
}

export default AdminViewSchool;