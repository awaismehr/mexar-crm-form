import * as React from "react";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Button,
  Paper,
  Container,
  Snackbar,
} from "@mui/material";

export default function Form() {
  const [gender, setGender] = React.useState("female");
  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [formValues, setFormValues] = React.useState({
    name: "",
    email: "",
    dob: "",
    address: "",
    phoneNumber: "",
    workExperience: "",
    educationalLevel: "elementarySchool",
  });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };

  const educationLevels = [
    { label: "Elementary School", value: "elementarySchool" },
    { label: "Middle School", value: "middleSchool" },
    { label: "High School", value: "highSchool" },
    { label: "University", value: "university" },
    { label: "Graduate School", value: "graduateSchool" },
  ];

  const skillsOptions = [
    { label: "Software Development", value: "softwareDevelopment" },
    { label: "Data Analysis", value: "dataAnalysis" },
    { label: "Design", value: "design" },
    { label: "Project Management", value: "projectManagement" },
    { label: "Other", value: "otherSkills" },
  ];

  const handleCheckboxChange = (value) => {
    setSelectedSkills((prevSkills) => {
      if (prevSkills.includes(value)) {
        return prevSkills.filter((skill) => skill !== value);
      } else {
        return [...prevSkills, value];
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      form_id: 8,
      entity_id: 1,
      fields: [
        { id: 31, value: formValues.name },
        { id: 38, value: formValues.workExperience },
        { id: 34, value: formValues.address },
        { id: 33, value: formValues.dob },
        { id: 32, value: formValues.email },
        { id: 37, value: formValues.educationalLevel },
        { id: 36, value: gender },
        { id: 35, value: formValues.phoneNumber },
      ],
    };

    const payload = JSON.stringify(data);

    fetch("https://dev.sundev.ovh/api/v1/crm/forms/8", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        setOpenSnackbar(true);
        console.log("Success:", data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center" mb={2}>
          Crm Dynamic Form
        </Typography>

        <Grid container spacing={3} component="form" id="crmForm" onSubmit={handleSubmit}>
          <Grid item xs={12} sm={6}>
            <TextField id="name" name="name" label="Name" fullWidth variant="outlined" onChange={handleInputChange} value={formValues.name} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="email" name="email" label="Email" fullWidth variant="outlined" onChange={handleInputChange} value={formValues.email} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="dob" name="dob" fullWidth variant="outlined" type="date" onChange={handleInputChange} value={formValues.dob} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address"
              name="address"
              label="Address"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              onChange={handleInputChange}
              value={formValues.address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phoneNumber"
              name="phoneNumber"
              type="number"
              label="Phone Number"
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
              value={formValues.phoneNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={gender}
                onChange={handleChange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              id="educationLevel"
              name="educationLevel"
              label="Education Level"
              fullWidth
              variant="outlined"
              value={formValues.educationalLevel}
              onChange={handleInputChange}
            >
              {educationLevels.map((educationLevel) => (
                <MenuItem value={educationLevel.value} key={educationLevel.value}>
                  {educationLevel.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="workExperience"
              name="workExperience"
              label="Work Experience"
              fullWidth
              type="number"
              variant="outlined"
              value={formValues.workExperience}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormLabel>Skills</FormLabel>
            <FormGroup row>
              {skillsOptions.map((option, index) => (
                <FormControlLabel
                  name="skills"
                  key={index}
                  control={
                    <Checkbox
                      // @ts-ignore
                      checked={selectedSkills.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value)}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>

        <Button variant="contained" sx={{ mt: 3, ml: 1 }} type="submit" form="crmForm">
          Submit
        </Button>
      </Paper>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} message="Data submitted successfully" />
    </Container>
  );
}
