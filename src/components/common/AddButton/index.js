import { Button } from '@mui/material';
import { AiOutlinePlus } from 'react-icons/ai';

export const AddButton = ({ isDisable = false, onClick }) => (
    <Button onClick={() => onClick()} className="AddButton" disable={isDisable.toString()}>
        <AiOutlinePlus />
    </Button>
);
