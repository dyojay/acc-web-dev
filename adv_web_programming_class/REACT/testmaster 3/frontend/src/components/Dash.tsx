import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Welcome', //put user object right after welcome
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'notifications',
        title: 'Notifications',
        icon: <AddAlertIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Projects',
    },
    {
        segment: 'test',
        title: 'Tests',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'approved',
                title: 'Approved',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'pending',
                title: 'Pending',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'tasks',
        title: 'Tasks',
        icon: <LayersIcon />,
    },
];

const baseTheme = extendTheme({
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

function useBaseRouter(initialPath: string): Router {
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

const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
}));

export default function DashboardLayoutBasic(props: any) {
    const { window } = props;

    const router = useBaseRouter('/dashboard');

    // Remove this const when copying and pasting into your project.
    const demoWindow = window ? window() : undefined;

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={baseTheme}
            window={demoWindow}
        >
            <DashboardLayout>
                <PageContainer>
                    <Grid container spacing={1}>
                        <Grid size={5} />
                        <Grid size={12}>
                            <Skeleton height={14} />
                        </Grid>
                        <Grid size={12}>
                            <Skeleton height={14} />
                        </Grid>
                        <Grid size={4}>
                            <Skeleton height={100} />
                        </Grid>
                        <Grid size={8}>
                            <Skeleton height={100} />
                        </Grid>

                        <Grid size={12}>
                            <Skeleton height={150} />
                        </Grid>
                        <Grid size={12}>
                            <Skeleton height={14} />
                        </Grid>

                        <Grid size={3}>
                            <Skeleton height={100} />
                        </Grid>
                        <Grid size={3}>
                            <Skeleton height={100} />
                        </Grid>
                        <Grid size={3}>
                            <Skeleton height={100} />
                        </Grid>
                        <Grid size={3}>
                            <Skeleton height={100} />
                        </Grid>
                    </Grid>
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}
