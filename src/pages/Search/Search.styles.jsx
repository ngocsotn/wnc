import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	wrap:{
		padding: theme.spacing(1)
	},
	item :{
		padding: theme.spacing(0)
	},
	result: {
		padding: theme.spacing(7,14)
	},
	filter_warp:{
		paddingBottom: theme.spacing(5),
		display: 'flex',
		justifyContent:' center'
	},
	filter_item:{
		fontWeight: 900,
		padding: theme.spacing(0,3)
	},
	pagination: {
		paddingTop: theme.spacing(5),
		display: 'flex',
		justifyContent:' center'
	}
}));
