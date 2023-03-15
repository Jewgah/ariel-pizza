/* eslint-disable no-unused-vars */
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TagList from "../Components/TagList";
import { Controller, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import BranchService from "../Api/Controllers/BranchService";



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

	
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const regions = [
		{
			value: 'North',
			label: 'North',
		  },
		  {
			value: 'Haifa',
			label: 'Haifa',
		  }, 
		  {
			value: 'Central',
			label: 'Central',
		  },
		  {
			value: 'Dan',
			label: 'Dan',
		  },
		  {
			value: 'South',
			label: 'South',
		  },
	
	  ]; 
	  const actions = [
		{
			value: 'open',
			label: 'Open',
		  },
		  {
			value: 'close',
			label: 'Close',
		  },
	
	  ]; 
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
			borderRadius: "25px",
			boxShadow: "5px 5px 9px 3px rgba(0,0,0,0.78)",
			backgroundColor: "white",
			paddingBottom: 40,
			maxWidth: 550,
		},
	};

	const [data, setData] = React.useState("");
	const [region, setRegions] = React.useState('North');
	const [branch, setBranch] = React.useState('');
	const [action, setAction] = React.useState('');

 
	const handleChangeRegion = (event) => {
		setRegions(event.target.value);
	  };

	  const handleChangeBranch = (event) => {
		setBranch(event.target.value);
	  };
	  const handleChangeAction = (event) => {
		setAction(event.target.value);
	  };


	
	  const handleSubmitForm = (current) => {
		const dataToForm = {
			_region: region,
			_branch: branch,
			_action: action, 
		};
		setData(dataToForm);
		BranchService.actionBranch(dataToForm)

	};


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
							marginTop: 17,
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
						ACTIONS BRANCH
						</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit((data) =>
								handleSubmitForm(data)
							)}
							sx={{ mt: 3 }}
						>
							<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									id="region"
									name="region"
									type="String"
									label="region"
									select
									fullWidth
									error={errors?.title ? true : false}
									helperText={errors?.title?.message}
									value={region}
									onChange={handleChangeRegion}
									
									>
									{regions.map((option) => (
										<MenuItem key={option.value} value={option.value}>
										{option.label}
										</MenuItem>
									))}
									</TextField>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id="branch"
										label="branch"
										name="branch"
										type="String"
									
										autoComplete="branch:"
										{...register("branch:", {
											required: true,
											pattern: {
												message: "branch:",
												

											},
										})}
									error={errors?.title ? true : false}
									helperText={errors?.title?.message}
									value={branch}
									onChange={handleChangeBranch}
									/>
								</Grid>
						
								<Grid item xs={12}>
								<TextField
									required
									id="action"
									name="action"
									type="String"
									label="action"
									select
									fullWidth
									error={errors?.title ? true : false}
									helperText={errors?.title?.message}
									value={action}
									onChange={handleChangeAction}
									
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
								 Order Now
							</Button>
						</Box>
					</Box>
				</Container>
			</div>
		</div>
	</ThemeProvider>
	);
}