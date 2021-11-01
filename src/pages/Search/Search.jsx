import { Box, Container, Grid } from '@material-ui/core';
import React from 'react';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useStyles from './Search.styles';

function Search() {
	// const classes = useStyles();
  return (
		<>
			<select>
				<option value={10}>Tăng dần</option>
				<option value={20}>Giảm dần</option>
			</select>
			<select>
				<option value={10}>Thời gian kết thúc</option>
				<option value={20}>Giá cả</option>
			</select>

			<SectionTitle title="Gần kết thúc" />
			<ProductSlider listProduct={[1, 1, 1, 1, 1, 1, 1]} slidesToShow={4} />
    </>
  );
}

export default Search;