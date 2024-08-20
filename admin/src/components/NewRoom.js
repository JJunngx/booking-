// import React, { useEffect, useState, useRef } from "react";
// import classes from "./NewRoom.module.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const NewRom = () => {
//   const [nameHotel, setNameHotel] = useState([]);
//   const titleRef = useRef(null);
//   const priceRef = useRef(null);
//   const descriptionRef = useRef(null);
//   const maxPeopleRef = useRef(null);
//   const numberRoomRef = useRef(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     (async () => {
//       const res = await axios.get("http://localhost:5000/admin/nameHotel", {
//         headers: { "Content-Type": "application/json" },
//       });
//       setNameHotel(res.data);
//     })();
//   }, []);
//   const newRoomHandle = async (e) => {
//     e.preventDefault();
//     const titleEntered = titleRef.current.value;
//     const priceEntered = priceRef.current.value;
//     const descriptionEntered = descriptionRef.current.value;
//     const maxPeopleEntered = maxPeopleRef.current.value;
//     const numberRoomEntered = numberRoomRef.current.value;
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/admin/newRoom",
//         {
//           titleEntered,
//           priceEntered,
//           descriptionEntered,
//           maxPeopleEntered,
//           numberRoomEntered,
//         },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       if (res.data.message) {
//         alert(res.data.message);
//       }
//       navigate("/rooms");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <div className="text-body-tertiary shadow  p-3 my-3 ms-2 ">
//         Add New Room
//       </div>
//       <form className="shadow px-5 py-2  ms-2" onSubmit={newRoomHandle}>
//         <div className="row justify-content-between">
//           <div className="col-5">
//             <div className="mb-3">
//               <label>Title</label>
//               <input
//                 type="text"
//                 placeholder="title"
//                 className={classes.input}
//                 ref={titleRef}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label>Price</label>
//               <input
//                 type="number"
//                 placeholder="price"
//                 className={classes.input}
//                 ref={priceRef}
//                 required
//               />
//             </div>
//           </div>
//           <div className="col-5">
//             <div className="mb-3">
//               <label>Description</label>
//               <input
//                 type="text"
//                 placeholder="description"
//                 className={classes.input}
//                 ref={descriptionRef}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label>Max people</label>
//               <input
//                 type="number"
//                 placeholder="price"
//                 min={1}
//                 className={classes.input}
//                 ref={maxPeopleRef}
//                 required
//               />
//             </div>
//           </div>
//         </div>
//         <div className="d-flex justify-content-between">
//           <div className="mb-3">
//             <label>Rooms</label>
//             <textarea
//               rows="2"
//               cols="30"
//               placeholder="number room"
//               className="d-block w-100"
//               ref={numberRoomRef}
//               required
//             ></textarea>
//           </div>
//           <div className="mb-3">
//             <label>Choose a hotel</label>
//             <select className="d-block">
//               {nameHotel.map((name, index) => (
//                 <option value={name} key={index}>
//                   {name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button type="submit" className={classes.button}>
//             Send
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewRom;
import React, { useRef } from "react";
import classes from "./NewRoom.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputRoom from "./InputRoom";
const NewRom = () => {
  const inputRef = {
    titleRef: useRef(null),
    priceRef: useRef(null),
    descriptionRef: useRef(null),
    maxPeopleRef: useRef(null),
    numberRoomRef: useRef(null),
  };
  const navigate = useNavigate();

  const newRoomHandle = async (e) => {
    e.preventDefault();
    const titleEntered = inputRef.titleRef.current.value;
    const priceEntered = inputRef.priceRef.current.value;
    const descriptionEntered = inputRef.descriptionRef.current.value;
    const maxPeopleEntered = inputRef.maxPeopleRef.current.value;
    const numberRoomEntered = inputRef.numberRoomRef.current.value;
    try {
      const res = await axios.post(
        "http://localhost:5000/admin/newRoom",
        {
          titleEntered,
          priceEntered,
          descriptionEntered,
          maxPeopleEntered,
          numberRoomEntered,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.message) {
        alert(res.data.message);
      }
      navigate("/rooms");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="text-body-tertiary shadow  p-3 my-3 ms-2 ">
        Add New Room
      </div>
      <InputRoom ref={inputRef} handle={newRoomHandle} />
    </div>
  );
};

export default NewRom;
