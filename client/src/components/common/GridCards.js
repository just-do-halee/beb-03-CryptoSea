import React, { useState } from 'react';
import NFT from './NFT';
import styled from "styled-components";
// import FlexContainer from './FlexContainer';

// 컨테이너 
const CardContainer = styled.div`
    * {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
`;


function GridCards({ Cards } = {}) {
    let filterCards = Cards.filter(card => {
        return card.image_url && card.name
    })
    console.log(filterCards)
    return (

        <CardContainer>
            <div>
                {filterCards.map(card => {
                    const { name, image_url } = card
                    return <NFT image={image_url} name={name} />
                })}
            </div>
        </CardContainer>
    )
}

export default GridCards