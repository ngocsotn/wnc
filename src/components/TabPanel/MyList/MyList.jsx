import React from 'react';
import PanelTitle from '../../PanelTitle/PanelTitle';
import ProductItemV2 from '../../ProductItemV2/ProductItemV2';
import useStyles from './MyList.styles';
function MyList() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PanelTitle title="Danh sách của tôi" />
      <ProductItemV2
        who="user-save"
        seller="ngocsotn"
        sellerPoint={2}
        title="Macbook pro 2020"
        status="Đang đấu giá"
        imgSrc="https://cf.shopee.vn/file/8126085bad03c21779e1b77876fb7316"
        totalBid="5"
        dateCreated="31/10/2021 4:30:00"
        dateEnd="1/11/2021 12:00:00"
        currentPrice="5000"
        currentBidder="xizot"
        currentBidderPoint={9}
      />
      <ProductItemV2
        who="user-save"
        seller="ngocsotn"
        sellerPoint={2}
        title="Macbook pro 2020"
        status="Đang đấu giá"
        imgSrc="https://cf.shopee.vn/file/8126085bad03c21779e1b77876fb7316"
        totalBid="5"
        dateCreated="31/10/2021 4:30:00"
        dateEnd="1/11/2021 12:00:00"
        currentPrice="5000"
        currentBidder="xizot"
        currentBidderPoint={9}
      />
      <ProductItemV2
        who="user-save"
        seller="ngocsotn"
        sellerPoint={2}
        title="Macbook pro 2020"
        status="Đang đấu giá"
        imgSrc="https://cf.shopee.vn/file/8126085bad03c21779e1b77876fb7316"
        totalBid="5"
        dateCreated="31/10/2021 4:30:00"
        dateEnd="1/11/2021 12:00:00"
        currentPrice="5000"
        currentBidder="xizot"
        currentBidderPoint={9}
      />
    </div>
  );
}

export default MyList;
