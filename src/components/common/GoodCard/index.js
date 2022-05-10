import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { connect } from 'react-redux';
import defaultGoodImage from '../../../images/default-good-image.png';
import { actionCartAdd } from '../../../reducers';
import { CBuyButton } from '../BuyButton';

const GoodCard = ({ good = {} }) => {
    return (
        <Card className="GoodCard">
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={`${good.images ? good.images[0]?.url : defaultGoodImage}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div" color="#1C1B1F" textAlign="left">
                        Назва: {good.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="left">
                        Ціна: {good.price}
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
