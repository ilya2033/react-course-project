import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionFeedAdd } from "../../../reducers";

export const InfScroll = ({ component = null, onScroll = null, items = [], promiseStatus, ...restProps } = {}) => {
    const C = component;
    const dispatch = useDispatch();
    useEffect(() => {
        window.onscroll = (e) => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
                if (promiseStatus !== "PENDING") {
                    onScroll && onScroll();
                }
            }
        };
        return () => {
            window.onscroll = null;
        };
    }, [onScroll]);

    useEffect(() => {
        if (items?.length) dispatch(actionFeedAdd(items));
    }, [items]);

    return <C {...restProps} />;
};
