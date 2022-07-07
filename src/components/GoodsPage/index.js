import { Grid, Stack, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { connect, useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { GoodCard } from "../common/GoodCard";
import { GoodList } from "../common/GoodList";
import { SubCategories } from "./SubCategories";
import { SortOptions } from "../common/SortOptions";
import { actionCatById } from "../../actions/actionCatById";
import { useEffect } from "react";
import { actionCategoryGoods } from "../../actions/actionCategoryGoods";

const GoodsPage = ({ category = {}, goods = [] }) => {
    const { name = "", subcategories = [] } = category || {};
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Box className="GoodsPage">
            <Box>
                <Typography variant="h5" textAlign="center">
                    {name}
                </Typography>
            </Box>

            {name && <Divider className="Divider" />}
            <Stack>
                <Box className="sortOptionsWrapper">
                    <SortOptions
                        defaultOption={searchParams.get("orderBy", null)}
                        onClick={(option) => {
                            searchParams.set("orderBy", option.value);
                            setSearchParams(searchParams);
                        }}
                    />
                </Box>
                {!!subcategories.length ? (
                    <Box>
                        <Typography variant="h6" color="#79747E" textAlign="left">
                            Категорії
                        </Typography>
                        <SubCategories categories={subcategories} />
                    </Box>
                ) : null}
                {!!goods.length ? (
                    <Box>
                        <Typography paddingBottom={1} variant="h6" color="#79747E" textAlign="left">
                            Товари
                        </Typography>
                        <GoodList goods={goods} />
                    </Box>
                ) : null}
            </Stack>
        </Box>
    );
};

const CGoodsPage = connect((state) => ({ category: state?.promise?.catById?.payload || [] }))(GoodsPage);
export { GoodsPage, CGoodsPage };
