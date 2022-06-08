import { Container, Grid, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Footer = () => (
    <Box className="Footer">
        <Container>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                    <Typography variant="body1" textAlign="left">
                        Графік роботи
                    </Typography>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="TableCell">
                                    <Typography variant="body2" textAlign="left">
                                        Пн-Пт:
                                    </Typography>
                                </TableCell>
                                <TableCell className="TableCell">
                                    <Typography variant="body2" textAlign="left">
                                        9.00-18.00
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="TableCell">
                                    <Typography variant="body2" textAlign="left">
                                        Субота:
                                    </Typography>
                                </TableCell>
                                <TableCell className="TableCell">
                                    <Typography variant="body2" textAlign="left">
                                        9.00-15.00
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="TableCell">
                                    <Typography variant="body2" textAlign="left">
                                        Неділя
                                    </Typography>
                                </TableCell>
                                <TableCell className="TableCell">
                                    <Typography variant="body2" textAlign="left">
                                        вихідний
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                    <Typography variant="body1" textAlign="left">
                        Контакти
                    </Typography>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="TableCell">
                                    <Typography variant="body2" textAlign="left">
                                        Тел:
                                    </Typography>
                                </TableCell>
                                <TableCell className="TableCell">
                                    <Typography variant="body2" textAlign="left">
                                        +380667213260
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="TableCell">
                                    <Typography variant="body2" textAlign="left">
                                        Email:
                                    </Typography>
                                </TableCell>
                                <TableCell className="TableCell">
                                    <Typography variant="body2" textAlign="left">
                                        illya.shyyan@hneu.net
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </Container>
    </Box>
);

export { Footer };
