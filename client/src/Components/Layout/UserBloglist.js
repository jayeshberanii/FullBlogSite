// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { addblogtoserver, getAllBlogs, getuserBlogs } from "../../API/api";

// function UserBloglist(props) {
//     const [User, setUserInfo] = useState({})    
//     const { isuser } = props
//     const [rowData, setrowData] = useState([]);
//     const [Category, setCategory] = useState("");

//     const [Disabledbtn, setDisabledbtn] = useState(true);
//     const [Title, settitle] = useState("");
//     const [Description, setdescription] = useState("");
//     const[deleteId,setdeleteID]=useState('')
//     const[Counter,setCounter]=useState(0)

//     const UserInfo = useSelector((state) => state.userInfo);

//     useEffect(() => {
//         setUserInfo(UserInfo[0]);
//     }, [UserInfo]);

//     useEffect(() => {
//         getuserBlogs(User.id).then((res) => console.log(setrowData(res.data)));
//     }, []);

//     const optionlist = [
//         "Food blogs",
//         "Personal blogs",
//         "Travel blogs",
//         "Lifestyle blogs",
//         "Fashion and beauty blogs",
//         "Health and fitness blogs",
//         "Photography blogs",
//       ];
//       useEffect(() => {
//         if (
//           Title !== "" &&
//           Title !== undefined &&
//           Category !== "" &&
//           Description !== ""
//         ) {
//           setDisabledbtn(false);
//         } else {
//           setDisabledbtn(true);
//         }
//       }, [Category, Title, Description]);
//       const onaddblogformSubmitHandler = async (e) => {
//         e.preventDefault();
//         const obj = { category: Category, title: Title, description: Description,userid:User.id};
//         addblogtoserver(obj)
//         setCounter(Counter+1)
//         setCategory("");
//         settitle("");
//         setdescription("");
//       };

//     return (
//         <>
//         <button
//           type="button"
//           className="btn btn-primary m-3"
//           data-bs-toggle="modal"
//           data-bs-target="#AddBlogModal"
//         >
//           Add Blog
//         </button>

//         <div
//           className="modal fade"
//           id="AddBlogModal"
//           tabIndex="-1"
//           aria-labelledby="exampleModalLabel"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog">
//             <form onSubmit={(e) => onaddblogformSubmitHandler(e)}>
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title" id="exampleModalLabel">
//                     Add Blog Details
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <select
//                       className="form-select"
//                       aria-label="Default select example"
//                       onChange={(e) => setCategory(e.target.value)}
//                       required
//                     >
//                       <option>Select Blog Category</option>
//                       {optionlist.map((item, pos) => {
//                         return (
//                           <option key={pos} value={item}>
//                             {item}
//                           </option>
//                         );
//                       })}
//                     </select>
//                     <label htmlFor="recipient-name" className="col-form-label">
//                       Title
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="recipient-name"
//                       onChange={(e) => settitle(e.target.value)}
//                       value={Title}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="message-text" className="col-form-label">
//                       Description
//                     </label>
//                     <textarea
//                       className="form-control"
//                       id="message-text"
//                       onChange={(e) => setdescription(e.target.value)}
//                       value={Description}
//                       required
//                     ></textarea>
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     data-bs-dismiss="modal"
//                   >
//                     Close
//                   </button>
//                   <button
//                     disabled={Disabledbtn}
//                     type="submit"
//                     data-bs-dismiss="modal"
//                     className="btn btn-primary"
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//             {
//                 isuser ?
//                     rowData.length ? rowData.map((item, pos) => {
//                         return (
//                             <div key={pos} className="accordion m-5" id={`${item.title}`}>
//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header" id="headingOne">
//                                         <button className="accordion-button" type="button" >
//                                             <figure className="mb-0">
//                                                 <blockquote className="blockquote mb-4">
//                                                     <strong>{item.title}</strong>
//                                                 </blockquote>
//                                                 <figcaption className="blockquote-footer mb-0">
//                                                     {item.category}
//                                                 </figcaption>
//                                             </figure>
//                                         </button>
//                                     </h2>
//                                     <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent={`#${item.title}`}>
//                                         <div className="accordion-body">
//                                             <p>{item.description}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )
//                     }) : <div className="d-flex align-items-center justify-content-center nodata">
//                             <div>No Data Found</div>
//                         </div> : <Link to='/login' >Login First</Link>
//                 // "<Navigate to='/login'/>"
//             }
//         </>
//     );
// }

// export default UserBloglist;
