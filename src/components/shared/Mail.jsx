import React, { useEffect, useState } from "react";
import { BiArchiveIn } from "react-icons/bi";
import { IoMdMore } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
  MdOutlineMarkEmailUnread,
  MdOutlineReport,
  MdOutlineWatchLater,
} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  getADataFromFirestoreRealtimeRef,
  getADataFromFirestoreRef,
} from "../../firebase/builds";
import { useFirebase } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { addToSnoozed, markAsImportant } from "../../redux/reducers/mailSlice";
import { serverTimestamp } from "firebase/firestore";
import { FaCross } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Mail = () => {
  const [mailQtyActive, setMailQtyActive] = useState(false);
  const [snoozedOpen, setSnoozedOpen] = useState(false);
  const [snoozedValue, setSnoozedValue] = useState("");
  const [message, setMessage] = useState(null);
  const currentUser = useFirebase();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMail = async () => {
      try {
        // Check if mail is in the snoozed collection
        const snoozedMail = await getADataFromFirestoreRef("snoozed", id);
        const importantMail = await getADataFromFirestoreRef("important", id);
        if (snoozedMail || importantMail) {
          if (snoozedMail) {
            setMessage(snoozedMail);
          } else {
            setMessage({...importantMail, isImportant: true});
          }
        } else {
          const unsubscribe = getADataFromFirestoreRealtimeRef(
            "inbox",
            id,
            (data) => {
              setMessage({ ...data, snoozedTime: null });
            }
          );
          return () => {
            unsubscribe();
          };
        }
      } catch (error) {
        console.error("Error fetching mail: ", error);
      }
    };

    fetchMail();
  }, [id]);

  if (!message) {
    return <div>Loading...</div>;
  }

  const handleSnoozed = () => {
    if (snoozedValue) {
      const [hours, minutes] = snoozedValue.split(":");
      const snoozedDate = new Date();
      snoozedDate.setHours(hours);
      snoozedDate.setMinutes(minutes);
      snoozedDate.setSeconds(0);
      dispatch(
        addToSnoozed({
          id: id,
          mail: {
            ...message,
            snoozedTime: snoozedDate,
          },
        })
      );
      setSnoozedValue("");
    }
    setSnoozedOpen(false);
  };

  return (
    <div className="flex-1 bg-white rounded-xl mx-5">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700 py-2 w-full">
          <Link
            to={"/"}
            className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
          >
            <IoArrowBack size={20} />
          </Link>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <BiArchiveIn size={20} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <MdOutlineReport size={20} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <RiDeleteBin6Line size={20} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <MdOutlineMarkEmailUnread size={20} />
          </div>

          {snoozedOpen ? (
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer flex">
              <input
                onChange={(e) => setSnoozedValue(e.target.value)}
                type="time"
                placeholder="00"
                className="outline-none border-none rounded-full pl-2"
              />
              <RxCross2 size={22} onClick={handleSnoozed} />
            </div>
          ) : (
            <div
              onClick={() => setSnoozedOpen(true)}
              className={`p-2 rounded-full ${
                message.snoozedTime && "text-blue-700"
              } hover:bg-gray-200 cursor-pointer`}
            >
              <MdOutlineWatchLater size={20} />
            </div>
          )}
          <div
            onClick={() => dispatch(markAsImportant({ id: id, mail: message }))}
            className={`p-2 rounded-full hover:bg-gray-200 cursor-pointer ${message.isImportant && "text-blue-700"}`}
          >
            <MdOutlineAddTask size={20} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <MdOutlineDriveFileMove size={20} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoMdMore size={20} />
          </div>
        </div>
      </div>
      <div className="h-[90vh] overflow-y-auto p-4">
        <div className="flex items-center justify-between bg-white gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium">{message.subject}</h1>
            <span className="text-sm bg-gray-200 rounded-md px-2">Inbox</span>
          </div>
          <div className="flex-none text-gray-500 my-5 text-sm">
            <p>{new Date(message.createdAt?.seconds * 1000).toUTCString()}</p>
          </div>
        </div>
        <div className="text-gray-500 text-sm">
          <h1>
            {currentUser.email === message.sender
              ? message.receiver
              : message.sender}
          </h1>
          <span>to me</span>
        </div>
        <div className="my-10">
          <pre className="text-wrap">{message.content}</pre>
        </div>
      </div>
    </div>
  );
};

export default Mail;
