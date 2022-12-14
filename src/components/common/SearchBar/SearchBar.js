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
        return () => {
            onSearchEnd && onSearchEnd();
        };
    }, []);

    useEffect(() => {
        setInputValue((searchLink === location.pathname && searchParams.get("text")) || "");
    }, [searchParams]);

    useEffect(() => {
        const checkClickOutsideHeaderSearchBar = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsChildrenOpen(false);
            } else {
                inputValue.length && setIsChildrenOpen(true);
            }
        };

        inputValue && onSearch(inputValue);

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
                    placeholder="??????????"
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
                        ??????????
                    </Button>
                ) : (
                    <Button variant="text" color="inherit">
                        ??????????
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
    onSearch: (text) => actionGoodsFind({ text, limit: 5, delay: 1500 }),
    onSearchEnd: () => actionPromiseClear("goodsFind"),
})(SearchBar);
