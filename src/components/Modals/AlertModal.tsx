import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalInterface {
    isopen: boolean;
    onClose: () => void;
    OnConfirm: () => void;
    loading: boolean;
}

const AlertModal = ({
    isopen,
    OnConfirm,
    loading,
    onClose,
}: AlertModalInterface) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Modal
            title="Are You Sure"
            description="This action Cannot be undone"
            isOpen={isopen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                    disabled={loading}
                    variant={"outline"}
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    disabled={loading}
                    variant={"destructive"}
                    onClick={OnConfirm}
                >
                    Continue
                </Button>
            </div>
        </Modal>
    );
};
export default AlertModal;
