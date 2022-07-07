import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { Box, TextField, Button, Stack, IconButton } from "@mui/material";
import { actionGoodsFind } from "../../../actions/actionGoodsFind";
import { useLocation, useSearchParams } from "react-router-dom";
import { actionPromiseClear } from "../../../reducers";

export const SearchBar = ({
    onSearchEnd,
    onSearch,
    onSearchButtonClick,
    render = null,
    renderParams = {},
    searchLink = "/search/",
} = {}) => {
    const ref = useRef();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState("");
    const [isChildrenOpen, setIsChildrenOpen] = useState(false);
    const [inputTimeout, setInputTimeout] = useState(null);
    const [touched, setTouched] = useState(false);
    const R = render;

    const handleOnClick = () => {
        if (!inputValue.trim().length) {
            return;
        }
        onSearchButtonClick(inputValue);
        setInputValue("");
        onSearchEnd && onSearchEnd();
        setIsChildrenOpen(false);
        setTouched(false);
    };

    useEffect(() => {
        setInputValue((searchLink === location.pathname && searchParams.get("text")) || "");
    }, [searchParams]);

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

        touched && setIsChildrenOpen(!!inputValue?.length);
        document.addEventListener("mousedown", checkClickOutsideHeaderSearchBar);
        return () => {
            document.removeEventListener("mousedown", checkClickOutsideHeaderSearchBar);
        };
    }, [inputValue]);

    return (
        <Box className={`SearchBar ${!isChildrenOpen && "hide"}`} ref={ref}>
            <Stack direction="row" alignItems="center">
                <TextField
                    variant="standard"
                    value={inputValue}
                    placeholder="Пошук"
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleOnClick()}
                    className="SearchBarInput"
                    onBlur={() => setTouched(true)}
                    onClick={() => setTouched(true)}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={() => setInputValue("")} edge="end">
                                {inputValue && <AiOutlineCloseCircle />}
                            </IconButton>
                        ),
                    }}
                />

                {!!inputValue ? (
                    <Button className="Link" onClick={handleOnClick} variant="text" color="inherit">
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
                            setInputValue("");
                            onSearchEnd && onSearchEnd();
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
    onSearchEnd: () => actionPromiseClear("goodsFind"),
})(SearchBar);
