// import React from "react";
// import { Link } from "react-router-dom";

// export default function DetailList() {

//     /*
//     아이템 리스트의 데이터를 바인딩하고
//     맵을 돌면서 아이템의 데이터의 id에 접근 -> 상세페이지 링크를 보여준다
//     */
//     let [id, image, price] = data;

//     return (
//         <div className="item-list">
//             data.map((data) => (
//             <li key={data.id}>
//                 <Link to={`/Details/$(data.id)`} >
//                     console.log(data);
//                 </Link>
//             </li>
//             ))
//         </div>
//     )
// }