/* eslint-disable no-unused-vars */
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PizzaIcon from "@mui/icons-material/LocalPizzaOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TagList from "./TagList";
import { Controller, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';

const { generateData } = require('./simulator');


const actions = [
	{
	  value: 'Open',
	  label: 'open',
	},
	{
	  value: 'Close',
	  label: 'close',
	},

  ];


const theme = createTheme({
	palette: {
	  primary: {
		light: '#000000',
		main: '#000000',
		dark: '#000000',
		contrastText: '#fff',
	  },
	  secondary: {
		light: '#FA4F03',
		main: '#FA4F03',
		dark: '#FA4F03',
		contrastText: '#000',
	  },
	},
  })

export default function OpenClose() {


	
	const [action, setActions] = React.useState('Open');
	const handleChange = (event) => {
		setActions(event.target.value);
	  };
	
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const styles = {
		paperContainer: {
			backgroundSize: "cover",
			backgroundImage: `url(${"https://zupimages.net/up/23/06/e1qp.jpg"})`,
			minHeight: 1000,
		},
		formContainer: {
			padding: "40px",
		},
	};

	const style_form = {
		paperContainer: {
			borderRadius: "45px",
			boxShadow: "5px 5px 9px 3px rgba(0,0,0,0.78)",
			backgroundColor: "white",
			paddingBottom: 40,
			maxWidth: 650,
		},
	};

	const [selectedFiles, setSelectedFiles] = useState([]);
	const [tagSelected, setTagSelected] = useState([]);
	const [data, setData] = React.useState("");

	// let navigate = useNavigate();

	// const handleSubmitForm = (current) => {
	// 	generateData(current);
	// };

	handleSubmit((data) => {
		const branch = data.branch;
		const pizzanumber = data.pizzanumber;
		generateData(branch, pizzanumber);
	  })
	  


	return (
		<ThemeProvider theme={theme}>
			
		<div style={styles.paperContainer}>
		
			<div style={styles.formContainer}>
				<Container
					component="main"
					maxWidth="xs"
					style={style_form.paperContainer}
				>
					<CssBaseline />
					<Box
						sx={{
							marginTop: 19,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar
							sx={{
								width: 66,
								height: 66,
								m: 1,
								bgcolor: "secondary.main",
								mt: 4,
								mb: 2,
							}}
						>
							<CloseIcon sx={{ width: 40, height: 40, m: 1 }} />
						</Avatar>
						<Typography component="h1" variant="h5">
						OPEN OR CLOSE BRANCH
						</Typography>
						<Box
							component="form"
							// onSubmit={handleSubmit((data) =>
							// 	handleSubmitForm(data)
							// )}
							sx={{ mt: 3 }}
						>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id="branch"
										label="Branch"
										name="branch"
										type="tel"
										autoComplete="Name of Branch:"
										{...register("Name of Branch:", {
											required: true,
											pattern: {
												message: "Name of Branch:",
												

											},
										})}
										error={errors?.title ? true : false}
										helperText={errors?.title?.message}
									/>
								</Grid>

								<Grid item xs={12}>
								<TextField
									id="outlined-select-action"
									select
									fullWidth
									label="Select"
									value={action}
									onChange={handleChange}
									helperText="Please select your action"
									>
									{actions.map((option) => (
										<MenuItem key={option.value} value={option.value}>
										{option.label}
										</MenuItem>
									))}
									</TextField>
								</Grid>

							</Grid>

							<Button
								fullWidth
								type="submit"
								variant="contained"
								color="secondary"
								sx={{ mt: 3, mb: 6 }}
							>
							Submit 
							</Button>
						</Box>
					</Box>
				</Container>
			</div>
		</div>
	</ThemeProvider>
	);
}
