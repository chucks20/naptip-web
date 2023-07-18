import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../themes";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = [
    { month: "Jan", Reports: 9 },
    { month: "Feb", Reports: 7 },
    { month: "Mar", Reports: 5 },
    { month: "Apr", Reports: 12 },
    { month: "May", Reports: 14 },
    { month: "Jun", Reports: 19 },
    { month: "Jul", Reports: 20 },
    { month: "Aug", Reports: 9 },
    { month: "Sep", Reports: 15 },
    { month: "Oct", Reports: 2 },
    { month: "Nov", Reports: 22 },
    { month: "Dec", Reports: 10 },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard"></Header>
      </Box>

      {/* GRIDS AND CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="50px"
        gap="20px"
      >
        {/* row 1 */}
        <Box
          gridColumn="span 3"
          blackgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox title="355" subtitle="Total report today" />
        </Box>
        <Box
          gridColumn="span 3"
          blackgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox title="84" subtitle="Total reports this month" />
        </Box>
        <Box
          gridColumn="span 3"
          blackgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox title="376" subtitle="Completed cases" />
        </Box>
        <Box
          gridColumn="span 3"
          blackgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox title="136" subtitle="Pending Cases" />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 6"
          backgroundColor="#fff"
          borderRadius="10px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h5" fontWeight="600" color="black">
                Total Cases per Year
              </Typography>
              <Typography variant="h3" fontWeight="bold" color="black">
                2023
              </Typography>
            </Box>
          </Box>
          <Box height="300px" mt="-20px">
            <BarChart
              data={data}
              colors={{ scheme: "nivo" }}
              borderColor="#000000"
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 6"
          backgroundColor="#fff"
          borderRadius="10px"
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            // borderBottom={`1px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            {" "}
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Reports
            </Typography>
          </Box>
          <Box height="300px" mt="-20px">
            <PieChart data={data} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
