import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { backendURL, mediaURL } from "../../../helpers";
import defaultGoodImage from "../../../images/default-good-image.png";
import { actionCartAdd } from "../../../reducers";
import { CBuyButton } from "../BuyButton";

const styles = {
    media: {
        height: 250,
        objectFit: "contain",
    },
};

const GoodCard = ({ good = {} }) => {
    return (
        <Card className="GoodCard">
            <CardActionArea component={Link} to={`/good/${good._id}`}>
                <CardMedia
                    component="img"
                    image={`${backendURL}${mediaURL}${good.images ? good.images[0]?.url : defaultGoodImage}`}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = defaultGoodImage;
                    }}
                    style={styles.media}
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div" color="#1C1B1F" textAlign="left">
                        Назва: {good.name?.length > 10 ? `${good.name.slice(0, 10)}...` : good.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="left">
                        Ціна: {good.price} ₴
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <CBuyButton good={good} key={good._id} />
            </CardActions>
        </Card>
    );
};

const CGoodCard = connect(null, {
    handleOnClick: (good) => actionCartAdd(good),
})(GoodCard);

export { GoodCard, CGoodCard };
