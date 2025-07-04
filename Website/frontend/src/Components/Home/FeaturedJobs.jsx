import React, { useEffect, useState } from 'react';
import {
  FaMapMarkerAlt,
  FaClock,
  FaBriefcase,
  FaStar,
  FaFire,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJobs, applyToJob } from '../../app/job/thunak';
import axios from '../../config/axios';

const FeaturedJobs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sid, setSid] = useState(null);
  const [name, setName] = useState('');
  const [phone, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]);


  const dispatch = useDispatch();

  const { jobs = [], loading, error } = useSelector(
    (state) => state.job
  );

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  // ✅ Call Now Handler
  const handleCallNow = (id) => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(applyToJob(id))
      .unwrap()
      .then(() => {
        alert('✅ Applied Successfully');
        setAppliedJobs((prev) => [...prev, id]); // 👉 Mark this job as applied
      })
      .catch((err) => alert('❌ Apply Failed: ' + err.message));
  } else {
    setSid(id);
    setIsOpen(true);
  }
};


  // ✅ Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/loginOrRegister', { name, phone, });
      const { token, user } = res.data;
      // Token Save
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setIsOpen(false);
      setName('');
      setMobile('');
      setPassword('');

      // Call job after login
      if (sid) {
        handleCallNow(sid);
      }
    } catch (err) {
      alert('❌ Login Failed');
      console.log(err);
    }
  };

  const handleClose = () => setIsOpen(false);

  return (
    <div className="mx-auto px-5 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-extrabold text-[#1F2937] mb-2 drop-shadow-md">
          <span className="text-[#0077B6]">Multiple</span> Jobs
        </h2>
        <p className="text-gray-600 text-sm">
          Find daily-wage or skilled jobs that match your expertise
        </p>
      </div>






      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">❌ {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border-l-4 border-[#0077B6] bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            
            <div className="flex justify-between items-start mb-2">
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-[#1F2937] hover:underline">
                  {job.title}
                </h3>


                <p className="text-sm text-gray-500">{job.company}</p>
              </div>
              {job.featured && (
                <span className="flex items-center bg-[#FFF4D9] text-[#B68900] text-xs font-medium px-2 py-0.5 rounded-full">
                  <FaStar className="mr-1" /> Featured
                </span>
              )}
            </div>

            <div className="space-y-1 text-sm text-gray-600 mb-3">
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-[#0077B6]" />{' '}
                {job.location}
              </p>
              <p className="flex items-center">
                <FaClock className="mr-2 text-[#0077B6]" /> {job.experience}
              </p>
              <p className="flex items-center">
                <FaBriefcase className="mr-2 text-[#0077B6]" /> {job.salaryMin}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-[#F0F4F8] flex text-gray-700 text-xs px-2 py-1 rounded-full">
                {job.jobpost}
              </span>
              {job.urgent && (
                <span className="bg-[#FFE5E5] text-[#E63946] text-xs px-2 py-1 rounded-full flex items-center">
                  <FaFire className="mr-1" /> Urgent
                </span>
              )}
            </div>

         {appliedJobs.includes(job._id) ? (
  <div className="text-green-700 font-semibold text-center py-2 border-2 border-green-600 rounded-lg">
    📞 {job?.phone || "No Number"}
  </div>
) : (
  <button
    onClick={() => handleCallNow(job._id)}
    className="w-full border-2 border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6] hover:text-white text-sm py-2 rounded-lg transition duration-200"
  >
    Call Now
  </button>
)}

          </div>
        ))}
      </div>

      {/* ✅ Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              Login to Continue
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Mobile Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  placeholder="Enter mobile number"
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              {/* <div>
                <label className="block mb-1 text-sm">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div> */}
              <button
                type="submit"
                className="w-full bg-[#0077B6] text-white py-2 rounded-md hover:bg-blue-700"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedJobs;



// import React from "react";
// import {
//   FaMapMarkerAlt,
//   FaClock,
//   FaBriefcase,
//   FaStar,
//   FaFire,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const jobs = [
//   {
//     title: "Security Guard Needed Urgently",
//     company: "HouseHelp Pvt Ltd",
//     location: "Delhi, India",
//     time: "3 hours ago",
//     salary: "₹20,725/month",
//     type: "Temporary",
//     category: "Labour Services",
//     urgent: false,
//     featured: true,
//   },
//   {
//     title: "Caretaker Needed Urgently",
//     company: "Bright Homes Services",
//     location: "Hyderabad, India",
//     time: "3 hours ago",
//     salary: "₹19,647/month",
//     type: "Full Time",
//     category: "Labour Services",
//     urgent: false,
//     featured: false,
//   },
//   {
//     title: "Caretaker Needed Urgently",
//     company: "HouseHelp Pvt Ltd",
//     location: "Delhi, India",
//     time: "7 hours ago",
//     salary: "₹13,264/month",
//     type: "Temporary",
//     category: "Labour Services",
//     urgent: false,
//     featured: false,
//   },
//   {
//     title: "Trainer Needed Urgently",
//     company: "Bright Homes Services",
//     location: "Ahmedabad, India",
//     time: "3 hours ago",
//     salary: "₹19,547/month",
//     type: "Part Time",
//     category: "Labour Services",
//     urgent: false,
//     featured: true,
//   },
//   {
//     title: "Trainer Needed Urgently",
//     company: "Swift Facilities",
//     location: "Bangalore, India",
//     time: "7 hours ago",
//     salary: "₹11,770/month",
//     type: "Part Time",
//     category: "Labour Services",
//     urgent: false,
//     featured: true,
//   },
//   {
//     title: "Plumber Needed Urgently",
//     company: "Urban Care Services",
//     location: "Mumbai, India",
//     time: "2 hours ago",
//     salary: "₹10,019/month",
//     type: "Temporary",
//     category: "Labour Services",
//     urgent: true,
//     featured: false,
//   },
// ];

// const FeaturedJobs = () => {
//   return (
//     <div className="mx-auto px-5 sm:px-6 lg:px-8 py-10 ">
//          {/* Section Heading */}
//          <div className="text-center mb-10">
//            <h2 className="text-2xl font-extrabold text-[#1F2937] mb-2 drop-shadow-md">
//              <span className="text-[#0077B6]">Multiple</span> Jobs
//            </h2>
//            <p className="text-gray-600 text-sm">
//              Find daily-wage or skilled jobs that match your expertise
//            </p>
//          </div>

//          {/* Job Grid */}
//            <Link to="/job-detail">
//          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//            {jobs.map((job) => (
//              <div
//                key={job.id}
//                className="border-l-4 border-[#0077B6] bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all"
//              >
//                <div className="flex justify-between items-start mb-2">
//                  <div className="flex-grow">

//                      <h3 className="text-lg font-semibold text-[#1F2937] hover:underline">
//                        {job.title}mmm
//                      </h3>

//                    <p className="text-sm text-gray-500">{job.company}</p>
//                  </div>
//                  {job.featured && (
//                    <span className="flex items-center bg-[#FFF4D9] text-[#B68900] text-xs font-medium px-2 py-0.5 rounded-full">
//                      <FaStar className="mr-1" /> Featured
//                    </span>
//                  )}
//                </div>

//                <div className="space-y-1 text-sm text-gray-600 mb-3">
//                  <p className="flex items-center">
//                    <FaMapMarkerAlt className="mr-2 text-[#0077B6]" /> {job.location}
//                  </p>
//                  <p className="flex items-center">
//                    <FaClock className="mr-2 text-[#0077B6]" /> {job.time}
//                  </p>
//                  <p className="flex items-center">
//                    <FaBriefcase className="mr-2 text-[#0077B6]" /> {job.salary}
//                  </p>
//                </div>

//                <div className="flex flex-wrap gap-2 mb-4">
//                  <span className="bg-[#F0F4F8] text-gray-700 text-xs px-2 py-1 rounded-full">
//                    {job.type}
//                  </span>
//                  {job.urgent && (
//                    <span className="bg-[#FFE5E5] text-[#E63946] text-xs px-2 py-1 rounded-full flex items-center">
//                      <FaFire className="mr-1" /> Urgent
//                    </span>
//                  )}
//                </div>

//                <Link to="/apply">
//                  <button className="w-full border-2 border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6] hover:text-white text-sm py-2 rounded-lg transition duration-200">
//                    Apply Now
//                  </button>
//                </Link>
//              </div>
//            ))}

//          </div>
//           </Link>
//        </div>
//   );
// };

// export default FeaturedJobs;
