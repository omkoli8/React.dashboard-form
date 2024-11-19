import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  TextField,
  MenuItem,
  Button,
  Paper,
  Box,
} from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

const genders = ["Male", "Female", "Other"];

const HealthcareDashboard = () => {
  const [dob, setDob] = useState(null);
  const [age, setAge] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    file: null,
  });

  const handleDateChange = (date) => {
    setDob(date);
    const calculatedAge = moment().diff(moment(date), "years");
    setAge(calculatedAge);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData, { age });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url('https://www.shutterstock.com/image-vector/modern-health-care-medical-background-260nw-2465096667.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "20px 0",
        }}
      >
        <AppBar position="static" sx={{ bgcolor: "#00796b", height: 60 }}>
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <MedicalServicesIcon sx={{ fontSize: 30, mr: 2, color: "white" }} />
              <Typography variant="h6" sx={{ color: "#fff" }}>
                Healthcare Dashboard
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 5 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "rgba(255, 255, 255, 0.85)", // Transparent white
            }}
          >
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
              Patient Information
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    fullWidth
                    variant="outlined"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Gender"
                    fullWidth
                    variant="outlined"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    {genders.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Age (select DOB)"
                    value={dob}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                  {age && (
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#4caf50", mt: 1 }}
                    >
                      Calculated Age: {age} years
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" component="label" fullWidth>
                    Upload File
                    <input
                      type="file"
                      hidden
                      name="file"
                      onChange={handleFileChange}
                      required
                    />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default HealthcareDashboard;
