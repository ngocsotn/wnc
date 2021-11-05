import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import ModalTitle from '../../ModalTitle/ModalTitle';
import useStyles from './EditProductModalPanel.styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ButtonLoading from '../../UI/ButtonLoading/ButtonLoading';
import { quillConfig } from '../../../utils/quillConfig';

function EditProductModalPanel({ onClose }) {
  const classes = useStyles();
  const [description, setDescription] = useState('');
  console.log(description);

  return (
    <Container className={classes.root}>
      <form action="">
        <ModalTitle title="Cập nhật mô tả" onClose={onClose} />
        <div>
          <ReactQuill
            id="description"
            placeholder="Mô tả..."
            value={description}
            onChange={setDescription}
            className={classes.description}
            theme="snow"
            modules={quillConfig.modules}
            formats={quillConfig.formats}
          />
        </div>

        <ButtonLoading fullWidth={false} style={{ marginTop: 10 }}>
          Lưu
        </ButtonLoading>
      </form>
    </Container>
  );
}

export default EditProductModalPanel;
