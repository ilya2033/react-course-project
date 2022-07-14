import { Box, Stack, Typography } from "@mui/material";
import MainPageImage from "../../images/main-page-image.png";
import { GoodCardSlider } from "../common/GoodCardSlider";

const MainPage = ({ goods = [] } = {}) => {
    return (
        <Box className="MainPage">
            <Stack spacing={3}>
                <Box component="img" src={MainPageImage} className="MainPageImage" />
                <Box>
                    <Typography variant="h5" color="#79747E" textAlign="left">
                        Популярні товари
                    </Typography>
                </Box>
                <Box>
                    <GoodCardSlider goods={goods} />
                </Box>
            </Stack>
        </Box>
    );
};

export { MainPage };
