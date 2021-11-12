import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    actionHeader:{
        display: 'flex',
        justifyContent: 'center'
    },
		buttonAdd :{
			color: '#3f51b5',
			borderColor: '#3f51b5'
		},
		categoryTitle:{
			padding: theme.spacing(0, 0, 0, 0)
		},
		selectCategory: {
			margin: theme.spacing(0, 0, 0, 0)
		},
		selectWrap:{
			justifyContent:"left"
		},
		topWrapOptions: {
			display: 'flex',
			justifyContent: 'left',
			padding: 0,
			paddingTop: theme.spacing(5)
		}
}));
