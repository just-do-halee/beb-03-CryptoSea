import React, { useEffect, useState } from "react";
import axios from 'axios'
import styled from "styled-components";
// import './Explore.css';
import GridCards from '../common/GridCards.js';
// import CollectFilter from "./CollectFilter.js";
import { Link } from "react-router-dom";
import FlexContainer from '../common/FlexContainer';


const ExploreCss = styled.div`
h2 {
    text-align: center;
    font-size: 45px;
    font-weight: bold;
    margin-bottom: 55px;
}

ul {
    list-style: none;
}

li {
    font-weight: bold;
    list-style-type: none;
    float: left;
    margin-right: 20px;
    margin-left: 17px;
}

hr {
    margin-bottom: 38px;
}

`;

// const CardsDesign = styled.GridCards`
//     margin-top: 30px;
// `;




// Item 리스트를 구현
// 렌더링 될 현재 페이지에 API를 끌어오는 로직으로 구현하고 싶음
// 오픈씨 API 주소



// Explore 컴퍼넌트 Row당 3개씩 보여주는 작업 하기

// collection 카테고리별로 필터링 시켜서 api로 받아와서 보여주기
// useEffect()로 상태 변경 -> Row당 3개씩 정렬
const Container = styled.div`
    
    GridCards {
        display:flex;
        justify-content: center;
        align-items: center;
    }
    
`;



function Explore() {

    // const [Categorys, setCategorys] = useState([]);   // API 받아와서 카테고리 별로 필터링 시켜보자!!!
    // useEffect(() => {
    //     axios({
    //         method: 'get',
    //         url: 'https://api.opensea.io/api/v1/assets?limit=50',
    //     }).then(result => {
    //         setCategorys(result.{/*테마필터*/ })
    //     }).catch(err => console.log(err))
    // }, [2]);
    // console.log(Categorys);

    // const getData = async () => {
    //     try {
    //         const data = await axios({
    //             method: 'get',
    //             url: 'https://api.opensea.io/api/v1/assets?limit=50',
    //         })
    //         console.log(data.data.assets)
    //         return data.data.assets
    //     } catch (err) {
    //         console.log(err)
    //     }

    // }

    // const [Cards, setCards] = useState([]);     // Explore 페이지에서 컬렉션별 카드를 API로 불러옴
    // useEffect(() => {
    //     setCards(getData())
    // }, []);
    // // console.log(getData());

    return (
        <div style={{ width: '100%', margin: '0' }}>

            <div style={{ width: '85%', margin: '1rem auto' }}>
                <ExploreCss>
                    <br /><br />
                    <h2> Explore Collections </h2>
                    <ul>
                        {/* <CollectFilter /> */}
                        {/* 컬렉션 필터 리스트 링크 걸고, API 뿌려주기 */}
                        <li>Trending</li>
                        <li>Top</li>
                        <li>Art</li>
                        <li>Collectibles</li>
                        <li>Domain Names</li>
                        <li>Music</li>
                        <li>Photography</li>
                        <li>Sports</li>
                        <li>Trading Cards</li>
                        <li>Utility</li>
                        <li>Virtual Worlds</li>
                    </ul>
                    <br /><br /><hr />
                </ExploreCss>

                <div>
                    {/* <GridCards Cards={Cards}></GridCards> */}
                </div>

            </div>

        </div >
    )
}



export default Explore;