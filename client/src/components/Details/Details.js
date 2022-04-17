import React from 'react';
import styled from 'styled-components';
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




const ImageBox = styled.div`
    display: inline-flex;
    justify-content: space-around;
    width: 500px;
    height: 500px;
    border: 1px solid lightgray;
    border-radius: 10px;
    margin-left: 100px;
    margin-top: 50px;
`;

const TextBox = styled.div`
    display: inline-flex;
    justify-content: space-around;
    width: 500px;
    height: 250px;
    margin-left: 100px;
    margin-top: 30px;

    h1 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 30px;
    }

    .userInfo {
    font-size: 20px;
    }

    .price {
    margin-top: 20px;
    font-weight: bold;
    }

    Button {
    width: 200px;
    height: 50px;
    margin-left: 70px;
    margin-right: 30px;
    margin-top: 50px;
    border-radius: 15px;
  }

  .listings {
    width: 500px;
    height: 70px;
    border-radius: 10px;
    margin-top: 70px;
  }

  .offerbox {
    width: 500px;
    height: 70px;
    border-radius: 10px;
  }

  p {
    display: flex;
    text-align: center;
    padding: 3px 35px 3px 10px;
  }

`;

const Detail = styled.div`
    display: table-cell;
    vertical-align: middle;
    width: 500px;
    height: 300px;
    margin-left: 100px;
    margin-top: 50px;
    padding: 100px;
    

    .description {
    width: 500px;
    height: 70px;
    border-radius: 10px;
    }

    .properties {
    width: 500px;
    height: 70px;
    border-radius: 10px;
    }

    .details {
    width: 500px;
    height: 70px;
    border-radius: 10px;
    }
`;

const Activity = styled.div`
    width: 1200px;
    height: 70px;
    margin-left: 100px;
    margin-bottom: 50px;
`;



const Details = () => {
    return (
        <>
            <ImageBox>
                <div className='images'>
                    <h1>images</h1>
                    {/* 이미지 들어가는 부분 */}
                </div>
            </ImageBox>
            <TextBox>
                <div className='detailText'>
                    <h1>Satoshi #751</h1>
                    <p className='userInfo'>Owned by {/* ID 정보 */}</p>
                    <p className='price'>Current price<br />
                        ETH 0.05 ($150.44)</p>
                    <Button variant="contained">
                        <Link to="/">Buy now</Link> {/* 경로 설정 연동 필요 */}
                    </Button>
                    <Accordion>
                        <div className='listings'>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content" id="panel1a-header">
                                <Typography>Listings</Typography>
                            </AccordionSummary></div>
                        <AccordionDetails>
                            <Typography>
                                <p>
                                    Price
                                </p>
                                <p>
                                    USD Price
                                </p>
                                <p>
                                    Expiration
                                </p>
                                <p>
                                    From
                                </p>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <div className='offerbox'>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content" id="panel1a-header">
                                <Typography>Offer</Typography>
                            </AccordionSummary></div>
                        <AccordionDetails>
                            <Typography>
                                test
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </TextBox>
            <Detail>
                <Accordion>
                    <div className='description'>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content" id="panel1a-header">
                            <Typography>Description</Typography>
                        </AccordionSummary></div>
                    <AccordionDetails>
                        <Typography>
                            Created by {/* ID */}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <div className='properties'>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content" id="panel1a-header">
                            <Typography>Properties</Typography>
                        </AccordionSummary></div>
                    <AccordionDetails>
                        <Typography>
                            test
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <div className='details'>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content" id="panel1a-header">
                            <Typography>Details</Typography>
                        </AccordionSummary></div>
                    <AccordionDetails>
                        <Typography>
                            test
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Detail>
            <Activity>
                <Accordion>
                    <div className='item-activity'>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content" id="panel1a-header">
                            <Typography>Item Activity</Typography>
                        </AccordionSummary></div>
                    <AccordionDetails>
                        <Typography>
                            test
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Activity>
        </>
    )
}

export default Details;