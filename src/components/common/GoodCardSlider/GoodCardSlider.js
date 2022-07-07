import { Carousel } from "react-responsive-carousel";
import { GoodCardSet } from "./GoodCardSet";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
export const GoodCardSlider = ({ goods = [] } = {}) => {
    const [goodSets, setGoodSets] = useState([]);
    const num = 5;

    useEffect(() => {
        if (goods?.length) {
            let goodSets = [];
            for (let i = 0; i < goods.slice(0, 20).length; i += num) {
                if (i + num > goods.length && goods.length % num !== 0) {
                    goodSets.push(goods.slice(i, goods.length));
                    break;
                }
                goodSets.push(goods.slice(i, i + num));
            }
            setGoodSets(goodSets);
        }
    }, [goods]);

    return (
        <Box className="GoodCardSlider">
            <Carousel className="Slider" showThumbs={false} showStatus={false} showIndicators={false}>
                {(goodSets || []).map((goodSet, idx) => (
                    <Box key={idx}>
                        <GoodCardSet goods={goodSet} num={num} />
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
};
// autoPlay={true}
// autoPlaySpeed={1000}
// transitionDuration={500}
