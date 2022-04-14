import styled from 'styled-components';

import { Stack, Box, MenuItem, Select, FormControl } from '@mui/material';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import CreateContaier from '../common/CreateContainer.js';
import CollectionModal from './CollectionModal.js';
import collectionMenu from '../../data/collectionMenu.js';
const Item = styled.div`
  display: flex;
  flex-direction: row;

  /* border: 1px solid black; */
  position: relative;
  .icon-box {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }
  .collection-name {
    width: 400px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    h3 {
      font-size: 1.5rem;
    }
    p {
      font-size: 1.1rem;
      margin-top: -20px;
    }

    /* border: 1px solid black; */
  }
  .plus-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75px;
    height: 75px;
    position: absolute;
    right: 0;
    top: 10px;
    /* border: 0.5px solid blue; */
    :hover {
      opacity: 0.5;
    }
  }
  .properties-name {
    display: flex;
    flex-direction: column;
    * {
      font-size: 1.2rem;
    }
  }
  .button-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .plus-button {
    width: 150px;
  }
`;

const UploadCollection = () => {
  const [collection, setCollection] = useState('');

  const handleChange = (e) => {
    setCollection(e.target.value);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <CreateContaier>
      <h3>Collection</h3>
      <p>This is the collection where your item will appear</p>
      <Box sx={{ width: '100%' }}>
        <FormControl fullWidth>
          <Select value={collection} label="Collection" onChange={handleChange}>
            <MenuItem value={10}>Ten</MenuItem>
            {/* 뭐가 들어와야함?반복문을 돌리던지 아니면 데이터별로..? */}
          </Select>
          <Stack spacing={2}>
            {collectionMenu.map((collection, index) => {
              return (
                <Item key={index}>
                  <div className="icon-box">{collection.icon}</div>
                  <div className="collection-name">
                    <h3>{collection.name}</h3>
                    <p>{collection.description}</p>
                  </div>
                  <div className="plus-box">
                    <FaPlus size={30} onClick={handleOpen} />
                    <CollectionModal
                      handleClose={handleClose}
                      open={open}
                      collection={collection}
                    />
                  </div>
                </Item>
              );
            })}
          </Stack>
        </FormControl>
      </Box>
    </CreateContaier>
  );
};

export default UploadCollection;
