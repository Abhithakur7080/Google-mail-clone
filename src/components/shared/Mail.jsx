import React, { useEffect, useState } from "react";
import { BiArchiveIn } from "react-icons/bi";
import { IoMdMore } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
  MdOutlineMarkEmailRead,
  MdOutlineMarkEmailUnread,
  MdOutlineReport,
  MdOutlineWatchLater,
} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getADataFromFirestoreRef } from "../../firebase/builds";
import { useFirebase } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import {
  addToArchive,
  addToSnoozed,
  markAsImportant,
  markAsReadUnread,
  toggleSpam,
  trashRestore,
} from "../../redux/reducers/mailSlice";
import { RxCross2 } from "react-icons/rx";
import Loader from "./Loader";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { LiaTrashRestoreSolid } from "react-icons/lia";

const Mail = () => {
  const [snoozedOpen, setSnoozedOpen] = useState(false);
  const [snoozedValue, setSnoozedValue] = useState("");
  const [message, setMessage] = useState(null);
  const currentUser = useFirebase();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMail = async () => {
      try {
        const snoozedMail = await getADataFromFirestoreRef("snoozed", id);
        const importantMail = await getADataFromFirestoreRef("important", id);
        const spamMail = await getADataFromFirestoreRef("spam", id);
        const archiveMail = await getADataFromFirestoreRef("archive", id);
        const inboxMail = await getADataFromFirestoreRef("inbox", id);
        const trashMail = await getADataFromFirestoreRef("trash", id);

        if (trashMail) {
          setMessage({
            ...trashMail,
            isTrashed: true,
          });
        } else if (spamMail) {
          setMessage({
            ...spamMail,
            isSpam: true,
          });
        } else if (archiveMail) {
          setMessage({
            ...archiveMail,
            isArchived: true,
          });
        } else {
          setMessage({
            ...inboxMail,
            isSnoozed: Boolean(snoozedMail),
            snoozedTime: Boolean(snoozedMail) ? snoozedMail.snoozedTime : null,
            isImportant: Boolean(importantMail),
          });
        }
      } catch (error) {
        console.error("Error fetching mail: ", error);
      }
    };

    fetchMail();
  }, [id]);

  if (!message) {
    return <Loader />;
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
            data-tooltip-id="back"
            className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
          >
            <IoArrowBack size={20} />
            <ReactTooltip
              id={"back"}
              place={"left"}
              content={"Back to Index"}
            />
          </Link>
          <div
            data-tooltip-id="archive"
            onClick={() => dispatch(addToArchive(id))}
            className={`p-2 rounded-full cursor-pointer ${
              message.isArchived && "bg-blue-800 text-white"
            }`}
          >
            <BiArchiveIn size={20} />
            <ReactTooltip
              id={"archive"}
              place={"bottom"}
              content={"Add to Archive"}
            />
          </div>
          <div
            data-tooltip-id="spam"
            onClick={() => dispatch(toggleSpam(message))}
            className={`p-2 rounded-full cursor-pointer ${
              message.isSpam && "bg-red-700 text-white"
            }`}
          >
            <MdOutlineReport size={20} />
            <ReactTooltip
              id={"spam"}
              place={"bottom"}
              content={"Move to Spam"}
            />
          </div>
          <div
            onClick={() =>
              dispatch(
                trashRestore({ id: message.id, email: currentUser.email })
              )
            }
            data-tooltip-id="delete"
            className={`p-2 rounded-full cursor-pointer ${
              message.isTrashed && "bg-red-800 text-white"
            }`}
          >
            {message.isTrashed ? (
              <LiaTrashRestoreSolid size={20} />
            ) : (
              <RiDeleteBin6Line size={20} />
            )}
            <ReactTooltip
              id={"delete"}
              place={"bottom"}
              content={`${message.isTrashed ? "Restore mail" : "Delete mail"}`}
            />
          </div>
          {!message.isSpam && (
            <div
              onClick={() =>
                dispatch(markAsReadUnread({ id: id, mail: message }))
              }
              data-tooltip-id="unread"
              className={`p-2 rounded-full cursor-pointer ${
                message.read && "bg-blue-800 text-white"
              }`}
            >
              {message.read ? (
                <MdOutlineMarkEmailUnread size={20} />
              ) : (
                <MdOutlineMarkEmailRead size={20} />
              )}

              <ReactTooltip
                id={"unread"}
                place={"bottom"}
                content={`${message.read ? "Mark as Unread" : "Mark as read"}`}
              />
            </div>
          )}

          {!message.isSpam &&
            (snoozedOpen ? (
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
                data-tooltip-id="snoozed"
                onClick={() => setSnoozedOpen(true)}
                className={`p-2 rounded-full ${
                  message.isSnoozed && "bg-blue-700 text-white"
                } cursor-pointer flex items-center gap-2`}
              >
                {message.isSnoozed && (
                  <span>
                    {new Date(
                      message.snoozedTime?.seconds * 1000
                    ).toLocaleTimeString()}
                  </span>
                )}
                <MdOutlineWatchLater size={20} />
                <ReactTooltip
                  id={"snoozed"}
                  place={"bottom"}
                  content={"set to snoozed"}
                />
              </div>
            ))}
          {!message.isSpam && (
            <div
              data-tooltip-id="important"
              onClick={() =>
                dispatch(markAsImportant({ id: id, mail: message }))
              }
              className={`p-2 rounded-full cursor-pointer ${
                message.isImportant && "bg-blue-700 text-white"
              }`}
            >
              <MdOutlineAddTask size={20} />
              <ReactTooltip
                id={"important"}
                place={"bottom"}
                content={"Mark as Important"}
              />
            </div>
          )}
          <div
            data-tooltip-id="more"
            className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
          >
            <IoMdMore size={20} />
            <ReactTooltip id={"more"} place={"right"} content={"More"} />
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
