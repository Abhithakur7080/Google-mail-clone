import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import { MdChevronLeft, MdChevronRight, MdCropSquare } from "react-icons/md";
import { useFirebase } from "../../firebase/firebase";
import { getMultipleDocsFromFirestore } from "../../firebase/builds";
import Messages from "../shared/Messages";

const AllMail = () => {
  const [mailQtyActive, setMailQtyActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useFirebase();

  useEffect(() => {
    const fetchMails = async () => {
      try {
        if (currentUser?.email) {
          const mailsSender = await getMultipleDocsFromFirestore(
            "inbox",
            "sender",
            currentUser.email
          );
          const mailsReceiver = await getMultipleDocsFromFirestore(
            "inbox",
            "receiver",
            currentUser.email
          );
          const allmails = [...mailsSender.data, ...mailsReceiver.data]
          const sortedMails = allmails.sort((a, b) => {
            const aTimestamp = a.createdAt ? a.createdAt.seconds : 0;
            const bTimestamp = b.createdAt ? b.createdAt.seconds : 0;
            return bTimestamp - aTimestamp;
          });
          setMessages(sortedMails);
        }
      } catch (error) {
        console.error("Error fetching mails: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMails();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex-1 bg-white rounded-xl mx-5">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700 py-2 w-full">
          <div className="flex items-center gap-1">
            <MdCropSquare size={20} />
            <FaCaretDown size={20} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoMdRefresh size={20} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoMdMore size={20} />
          </div>
          <div
            onMouseOver={() => setMailQtyActive(true)}
            onMouseOut={() => setMailQtyActive(false)}
            className="ml-auto p-2 rounded-sm hover:bg-gray-200 cursor-pointer relative"
          >
            <p>{messages.length>0 ? "1" : "0"} - {messages.length >= 50 ? "50" : messages.length} of {messages.length}</p>
            <div
              className={`absolute top-9 left-0 w-full ${
                mailQtyActive ? "block" : "hidden"
              }`}
            >
              <h3 className="px-3 py-2 text-xl bg-white hover:bg-gray-100">Newest</h3>
              <h3 className="px-3 py-2 text-xl bg-white hover:bg-gray-100">Oldest</h3>
            </div>
          </div>

          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <MdChevronLeft size={20} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <MdChevronRight size={20} />
          </div>
        </div>
      </div>
      <div className="h-[90vh] overflow-y-auto">
        <Messages messages={messages} path="/send"/>
      </div>
    </div>
  );
};

export default AllMail;
