import * as React from 'react';
import { extendTheme, Theme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import { Box } from "@mui/material";
import RoleAssigned from "./RoleAssigned";
import {Dashboard} from "@mui/icons-material";

// Import other components you want to render
// import DashboardContent from "./DashboardContent";
// import ReportsContent from "./ReportsContent";
// import IntegrationsContent from "./IntegrationsContent";

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'roles',
        title: 'Roles',
        icon: <ShoppingCartIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
];

const demoTheme: Theme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter(initialPath: string): Router {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path: string | URL) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

interface DashBoardProps {
    window?: () => Window;
}

export default function DashBoard({ window }: DashBoardProps) {
    const router = useDemoRouter('/dashboard');

    const renderContent = () => {
        switch (router.pathname) {
            case '/dashboard':
                return <Dashboard />;
            case '/roles':
                return <RoleAssigned />;
            // case '/reports':
            //     return <ReportsContent />;
            // case '/integrations':
            //     return <IntegrationsContent />;
            default:
                return <div>Welcome to the Dashboard!</div>;
        }
    };

    const demoWindow = window ? window() : undefined;

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden',
            }}>
                <DashboardLayout>
                    <PageContainer>
                        <Grid container spacing={1}>
                            {renderContent()}
                        </Grid>
                    </PageContainer>
                </DashboardLayout>
            </Box>
        </AppProvider>
    );
}