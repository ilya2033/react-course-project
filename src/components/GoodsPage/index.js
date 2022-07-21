import { Stack, Typography, Divider, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { GoodList } from "../common/GoodList";
import { SubCategories } from "./SubCategories";
import { SortOptions } from "../common/SortOptions";

const GoodsPage = ({ category = {}, goods = [], promiseStatus = null }) => {
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
                        defaultOption={searchParams.get("orderBy", "createdAt")}
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
                {promiseStatus === "PENDING" && <LinearProgress />}
            </Stack>
        </Box>
    );
};

const CGoodsPage = connect((state) => ({
    category: state?.promise?.catById?.payload || {},
    goods: state?.feed?.payload || [],
    promiseStatus: state.promise?.feedCategoryGoods?.status || state.promise?.feedGoodsFind?.status || null,
}))(GoodsPage);
export { GoodsPage, CGoodsPage };
