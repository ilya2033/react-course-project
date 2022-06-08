import { useEffect, useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { Box, TextField, Button, Container, Stack, IconButton } from '@mui/material';
import { actionGoodsFind } from '../../../actions/actionGoodsFind';
import { actionPromiseClear } from '../../../reducers';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const SearchBar = ({
    onSearch,
    onSearchButtonClick,
    render = null,
    renderParams = {},
    searchLink = '/search/',
} = {}) => {
    const ref = useRef();
    const [inputValue, setInputValue] = useState('');
    const [isChildrenOpen, setIsChildrenOpen] = useState(false);
    const [inputTimeout, setInputTimeout] = useState(null);
    const R = render;

    useEffect(() => {
        if (inputTimeout) {
            clearTimeout(inputTimeout);
        }

        const checkClickOutsideHeaderSearchBar = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsChildrenOpen(false);
            } else {
                inputValue.length && setIsChildrenOpen(true);
            }
        };
        if (inputTimeout) {
            clearTimeout(inputTimeout);
            setInputTimeout(null);
        }
        setInputTimeout(
            setTimeout(() => {
                inputValue && onSearch(inputValue);
            }, 700)
        );

        setIsChildrenOpen(!!inputValue?.length);
        document.addEventListener('mousedown', checkClickOutsideHeaderSearchBar);
        return () => {
            document.removeEventListener('mousedown', checkClickOutsideHeaderSearchBar);
        };
    }, [inputValue]);

    return (
        <Box className={`SearchBar ${!isChildrenOpen && 'hide'}`} ref={ref}>
            <Stack direction="row" alignItems="center">
                <TextField
                    variant="standard"
                    value={inputValue}
                    placeholder="Пошук"
                    onChange={(e) => setInputValue(e.target.value)}
                    className="SearchBarInput"
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={() => setInputValue('')} edge="end">
                                {inputValue && <AiOutlineCloseCircle />}
                            </IconButton>
                        ),
                    }}
                />

                {!!inputValue ? (
                    <Button
                        className="Link"
                        onClick={() => {
                            setInputValue('');
                            onSearchButtonClick();
                        }}
                        variant="text"
                        color="inherit"
                    >
                        Пошук
                    </Button>
                ) : (
                    <Button variant="text" color="inherit">
                        Пошук
                    </Button>
                )}
            </Stack>
            <Stack direction="row">
                {isChildrenOpen && (
                    <R
                        onItemClick={() => {
                            setInputValue('');
                            onSearchButtonClick();
                        }}
                        {...renderParams}
                    />
                )}
            </Stack>
        </Box>
    );
};

export const CSearchBar = connect(null, {
    onSearch: (text) => actionGoodsFind({ text, limit: 5 }),
    onSearchButtonClick: () => actionPromiseClear('goodsFind'),
})(SearchBar);
