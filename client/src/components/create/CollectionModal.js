import styled from 'styled-components';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import StyledInput from '../common/StyledInput.js';
import { useForm } from 'react-hook-form';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContents: 'center',
  alignItems: 'center',
};

const CollectionInput = styled(StyledInput)`
  width: 150px;
  height: 30px;
  margin-bottom: 20px;
  border-color: #22acf6;

  ::placeholder {
    position: relative;
    left: 10px;
    color: #4d33f2;
  }
`;

const CollectionButton = styled(Button)`
  width: 200px;
  display: box;
  margin-bottom: 20px;
`;

const CollectionModal = (props) => {
  const { collection, handleClose, open } = props;

  const [addItem, setAddItem] = useState([]);
  const addMore = () => {
    setAddItem([...addItem, []]);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add {collection.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {collection.name} show up underneath your item, are clickable, and can
          be filtered in your collection's sidebar.
        </Typography>

        <Typography>
          {addItem.map((item, index) => {
            return (
              <ul key={index}>
                <li>
                  <CollectionInput type="text" placeholder="Name" />
                </li>
                <li>
                  <CollectionInput type="number" placeholder="Value" />
                </li>

                {/* 이걸 다른 key 값으로 받아오는 방법이 있을까........ 멘붕 */}
              </ul>
            );
          })}
        </Typography>
        <Typography>
          <CollectionButton
            className="plus-button"
            variant="outlined"
            onClick={addMore}
          >
            Add more
          </CollectionButton>
        </Typography>
        <Typography>
          <CollectionButton
            type="submit"
            className="save-button"
            variant="contained"
          >
            Save
          </CollectionButton>
          <Typography>
            <CollectionButton
              variant="outlined"
              color="secondary"
              onClick={handleClose}
            >
              Close
            </CollectionButton>
          </Typography>
        </Typography>
      </Box>
    </Modal>
  );
};

export default CollectionModal;
