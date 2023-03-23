import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const tags = [
	"Tomatoes",
	"Onions",
	"Peppers",
	"Mushroom",
	"Pepperoni",
	"Tuna",

];

function getStyles(name, tagSelected, theme) {
	return {
		fontWeight:
			tagSelected.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function TagList({tagSelected, setTagSelected}) {
	const theme = useTheme();

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setTagSelected(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	return (
		<div>
			<FormControl sx={{ width: 500 }}>
				<InputLabel id="demo-multiple-city-label">Toppings</InputLabel>
				<Select
			     	fullWidth
					multiple
					labelId="demo-multiple-city-label"
					id="demo-multiple-city"
					value={tagSelected}
					onChange={handleChange}
					input={<OutlinedInput label="City" />}
					MenuProps={MenuProps}
				>
					{tags.map((city) => (
						<MenuItem
							key={city}
							value={city}
							style={getStyles(city, tagSelected, theme)}
						>
							{city}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
