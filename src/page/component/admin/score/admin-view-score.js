import {useState} from "react";
import {Flex} from "@chakra-ui/react";
import {Button} from "antd";
import ViewWithScore from "../../view/view-with-score";
import ModalCreateScore from "./modal-create-score";

const AdminViewScore = () => {
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
            <ViewWithScore isModalOpen={isModalOpen}
                           setIsModalOpen={setIsModalOpen}
                           isAdmin={true}/>
        </Flex>
    )
}

export default AdminViewScore;