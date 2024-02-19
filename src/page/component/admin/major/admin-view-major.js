import {useState} from "react";
import {Flex} from "@chakra-ui/react";
import {Button} from "antd";
import ModalCreateMajor from "./modal-create-major";
import ViewWithMajor from "../../view/view-with-major";

const AdminViewMajor = () => {
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
            <ViewWithMajor isModalOpen={isModalOpen}
                           setIsModalOpen={setIsModalOpen}
                           isAdmin={true}/>
        </Flex>
    )
}

export default AdminViewMajor;