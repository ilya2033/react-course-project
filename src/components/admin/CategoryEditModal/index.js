import { useEffect } from 'react';
import { Modal } from '../../common/Modal';
import { CCategoryForm } from '../AdminCategoryPage/CategoryForm';

export const CategoryEditModal = ({ isOpen = false, onClose, category, onOpen } = {}) => {
    useEffect(() => {
        if (isOpen) {
            onOpen();
        }
    }, isOpen);
    return (
        <div className="NodeEditModal">
            <Modal open={isOpen} onClose={() => onClose()}>
                <CCategoryForm category={category} />
            </Modal>
        </div>
    );
};
