// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { get_interviews, create_interview, update_interview, delete_interview, selected_interview, remove_selected_interview } from "../../store/interviews"
// import { get_applications } from "../../store/applications"
// import CreateInterviewForm, { form_info } from "../forms/interview-form"
// import './interviews.css'


// const MyUpcomingInterviews = () => {
//   const applications = useSelector(state => state.applications.applications);
//   const interviews = useSelector(state => state.interviews.interviews);
//   const companies = useSelector(state => state.companies)

//   const [showNewInterviewForm, setShowNewInterviewForm] = useState(false);
//   const [showEditInterviewForm, setShowEditInterviewForm] = useState(false);
//   const [selectedInterview, setSelectedInterview] = useState()
//   const [loaded, setLoaded] = useState(false);

//   const dispatch = useDispatch();

//   const openNewInterviewForm = async () => {
//     if (showNewInterviewForm) return;
//     if (showEditInterviewForm) setShowEditInterviewForm(false);
//     closeInterviewForm();
//     await dispatch(remove_selected_interview())
//     setShowNewInterviewForm(true);
//   };

//   const openEditInterviewForm = async (interview_id) => {
//     closeInterviewForm();
//     setSelectedInterview(interview_id)
//     await dispatch(selected_interview(interview_id))
//     setShowEditInterviewForm(true);
//   };

//   const closeInterviewForm = () => {
//     setSelectedInterview(null)
//     setShowEditInterviewForm(false);
//     setShowNewInterviewForm(false);
//   };

//   const handleDelete = async (id) => {
//     const loaded = await dispatch(delete_interview(id))
//     setLoaded(loaded)
//   }

//   useEffect(() => {
//     if (interviews) return
//     dispatch(get_interviews())
//   }, [dispatch])

//   useEffect(() => {
//     if (applications) return
//     dispatch(get_applications())
//   }, [dispatch])

//   useEffect(() => {
//     if (loaded) {
//       renderInterviews()
//       setLoaded(false)
//     }
//   }, [loaded])

//   useEffect(() => {
//     renderEditForm(selectedInterview)
//   }, [selectedInterview])

//   const submitInterview = async (e) => {
//     e.preventDefault();
//     const info = form_info()
//     const loaded = await dispatch(create_interview(info))
//     setLoaded(loaded)
//     setSelectedInterview(null)
//     closeInterviewForm();
//   }

//   const editInterview = async (e) => {
//     e.preventDefault();

//     const info = form_info()
//     const id = e.target.id
//     const interview_info = {}
//     interview_info[id] = info;
//     // const loaded = await dispatch(update_interview(interview_info))
//     setLoaded(loaded)
//     closeInterviewForm();
//   }

//   const renderEditForm = (key) => {
//     return (
//       <>
//           <form id={key} className="form-body" onSubmit={editInterview}>
//             <div className="close-button" onClick={() => closeInterviewForm()}>X</div>
//             {showEditInterviewForm && <CreateInterviewForm />}
//             <button type="submit">Update Interview</button>
//           </form>
//       </>
//     )
//   }

//   const renderNewForm = () => {
//     return (
//       <>
//         <form className="form-body" onSubmit={submitInterview}>
//         <div className="close-button" onClick={() => setShowNewInterviewForm(false)}>X</div>
//         {showNewInterviewForm && <CreateInterviewForm />}
//         {<button id="add_button" type="submit">Create Interview!</button>}
//         </form>
//       </>
//     )
//   }
//   const renderInterviews = () => {
//     return (
//       interviews && Object.keys(interviews).map(key => {
//         const interview_date = new Date(interviews[key].date)
//         const todays_date = new Date()
//         const difference = Math.abs(interview_date - todays_date)
//         const difference_days = Math.ceil(difference / (1000 * 60 * 60 * 24))
//         let upcoming = false;
//         if (difference_days <= 7){
//           upcoming = true;
//         }

//         return (
//           <>
//           {upcoming &&
//             <div id="list">
//               <div className="each-holder">
//                 <div className="lines"></div>
//                 <div className="each-interview" id="li" onClick={() => openEditInterviewForm(key)}>
//                   <div>{companies[interviews[key].company_id].name}</div>
//                   <div className="upcoming">{upcoming && interview_date.toISOString().substring(0, 10)}</div>
//                   <button id="delete_interview" onClick={() => handleDelete(key)}>X</button>
//                 </div>
//               </div>
//             </div>
//             }
//           </>
//         )
//       })
//     )
//   }

//   return (
//     <>
//       <div className="interviews-block" id="interviews-block">
//         <h4>Interviews</h4>
//         <div id="list">
//           <div className="each-holder new">
//           <div className="lines"></div>
//           <div id="li" onClick={() => openNewInterviewForm()}>New Interview</div>
//           </div>
//         </div>
//         {renderInterviews()}

//       </div>
//       <div id="interviews-form">
//             {showNewInterviewForm && renderNewForm()}
//             {selectedInterview && renderEditForm()}
//         </div>
//     </>
//   )
// }



// export default MyUpcomingInterviews
