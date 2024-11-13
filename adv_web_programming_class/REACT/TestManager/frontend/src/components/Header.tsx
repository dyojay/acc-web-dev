import {AppBar,Box,Button,Toolbar,Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

    const Header =()=> {
    return (
        <Box sx={{marginBottom:4 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div">
                        Pj Magic
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Button component={NavLink} to="/" color="inherit"  sx={{ textTransform: 'none' }}> Home </Button>
                        <Button component={NavLink} to="/projects" color="inherit" sx={{ textTransform: 'none' }}> Projects </Button>
                        <Button component={NavLink} to="/modify" color="inherit" sx={{ textTransform: 'none' }}> Details </Button>

                    </Box>


                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default Header;