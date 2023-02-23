
import Link from 'next/link';
import Image from 'next/image'
import { Box, Container, Grid, Typography } from '@mui/material';

const Footer = () => {
    return (
        <footer>
            <Container maxWidth="lg">
                <Box py={6} display="flex" flexWrap="wrap" justifyContent={"space-between"} alignItems="center" >
                    <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>
                        © 2023. Все права защищеныРазработано в Киноплане
                    </Typography>
                    <Grid>
                    <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>
                        Все сеансы начинаются с рекламно-информационного блока.
                    </Typography>
                    <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>
                        Точную продолжительность сеансов можно уточнить в кинотеатре.
                    </Typography>
                    </Grid>
                </Box>
            </Container>
        </footer>
    );
}

export default Footer;

