import {AppBar,Box,Button,Toolbar,Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

    const Header =()=> {
    return (
        <Box sx={{marginBottom:4 }}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h3" component="div">
                        Pj Magic
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Button component={NavLink} to="/" color="inherit"  sx={{variant:"h4" , textTransform: 'none' }}> Home </Button>
                        <Button component={NavLink} to="/projects" color="inherit"  sx={{ variant:"h4" , textTransform: 'none' }}> Projects </Button>
                    </Box>


                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default Header;