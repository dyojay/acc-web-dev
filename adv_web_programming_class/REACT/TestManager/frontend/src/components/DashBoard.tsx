import * as React from 'react';
import { extendTheme, Theme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';import BarChartIcon from '@mui/icons-material/BarChart';
import TaskIcon from '@mui/icons-material/Task';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import { Box } from "@mui/material";
import RoleAssigned from "./RoleAssigned.tsx";
import {Dashboard, RecentActors} from "@mui/icons-material";
import ProjectList from "./ProjectList.tsx";
import TaskList from "./TaskList.tsx";
// import  TaskList from "./TaskList.tsx";

// Import other components you want to render
// import DashboardContent from "./DashboardContent";
// import ReportsContent from "./ReportsContent";

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
        icon: <RecentActors />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'Teams',
        title: 'Teams',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'projects',
                title: 'Projects',
                icon: <AssignmentIcon />,
            },
            {
                segment: 'tasks',
                title: 'Tasks',
                icon: <TaskIcon />,
            },
        ],
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
            case '/projects':
                return <ProjectList />;
            case '/tasks':
                return <TaskList/>;
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