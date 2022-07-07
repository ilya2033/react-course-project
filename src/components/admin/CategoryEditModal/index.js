import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCatById } from "../../../actions/actionCatById";
import { actionGoodsAll } from "../../../actions/actionGoodsAll";
import { actionPromiseClear } from "../../../reducers";
import { Modal } from "../../common/Modal";
import { CCategoryForm } from "../AdminCategoryPage/CategoryForm";

export const CategoryEditModal = ({ isOpen = false, onClose, category: categoryToEdit, onOpen } = {}) => {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.promise?.adminCatById?.payload || {});
    const { _id = null } = categoryToEdit || {};
    useEffect(() => {
        if (isOpen) {
            onOpen && onOpen();
        }
    }, [isOpen]);

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            dispatch(actionGoodsAll());
            if (_id) {
                dispatch(actionCatById({ _id, promiseName: "adminCatById" }));
            } else {
                dispatch(actionPromiseClear("adminCatById"));
            }
        }

        return () => {
            dispatch(actionPromiseClear("adminCatById"));
            dispatch(actionPromiseClear("goodsAll"));
        };
    }, [isOpen, _id]);

    return isOpen ? (
        <div className="NodeEditModal">
            <Modal open={isOpen} onClose={handleClose}>
                <CCategoryForm category={category} />
            </Modal>
        </div>
    ) : (
        false
    );
};
