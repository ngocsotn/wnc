import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  top: {
    minHeight: '100vh',
    padding: theme.spacing(7, 0, 5),
  },
  thumbnail: {
    position: 'relative',
    overflow: 'hidden',
    margin: '0 auto',
    marginBottom: theme.spacing(1),

    width: 370,
    maxWidth: '100%',
    '& .slick-slide ': {
      padding: `0  35px`,
    },
    '& .slick-slide $sliderImage img': {
      padding: theme.spacing(1),
      border: `1px solid #ddd`,
      borderRadius: theme.shape.borderRadius,
    },
    '& .slick-current $sliderImage img': {
      borderRadius: theme.shape.borderRadius,
      borderColor: theme.palette.primary.main,
    },
  },
  slider: {
    position: 'relative',

    '& .slick-slide $sliderImage img': {
      padding: theme.spacing(0.5),
      border: `1px solid #ddd`,
      borderRadius: theme.shape.borderRadius,
    },
    '& .slick-current $sliderImage img': {
      borderColor: theme.palette.primary.main,
    },
  },
  sliderControl: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2),

    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 500,
      margin: '0 auto',
    },
    '& .slick-track': {
      margin: 'auto',
    },
  },
  thumbnailImage: {
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  sliderImage: {
    height: 170,
    padding: theme.spacing(2, 3),
    '& img': {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },
  },
  sliderMainImage: {
    height: 350,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  section: {
    padding: theme.spacing(7, 0, 5),
  },
  sectionDetail: {
    background: '#ddd',
  },

  detailTop: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(5),
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(3),
    letterSpacing: 1.2,
    wordBreak: 'break-word',
    textTransform: 'capitalize',
  },
  seller: {
    fontStyle: 'italic',
  },
  created: {
    fontStyle: 'italic',
    display: 'flex',
    alignItems: 'center',
  },
  bid: {
    display: 'flex',
    flexWrap: 'noWrap',
    minWidth: 200,
    alignItems: 'flex-start',
    '& button': {
      marginLeft: 5,
    },
  },
  buyNow: {
    display: 'flex',
    marginBottom: theme.spacing(7),
  },
  btnBuy: {
    marginLeft: theme.spacing(2),
  },
  description: {
    fontSize: 18,
    lineHeight: 2,
  },
  addToWatchList: {
    marginTop: theme.spacing(1),
  },
  table: {
    '&, & th, & td': {
      border: '1px solid black',
      borderCollapse: 'collapse',
    },
  },
  bold: {
    background: '#ddd',
    '& td': {
      fontWeight: 'bold',
    },
  },
  accept: {
    color: 'green',
  },
  block: {
    color: theme.palette.secondary.main,
  },
	detailTitle : {
		paddingTop: theme.spacing(4),
		fontWeight: 600
	}
}));
