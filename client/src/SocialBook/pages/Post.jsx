import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { LuCopyPlus, LuCopyCheck } from "react-icons/lu";
import { FaEdit, FaBookmark } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineComment } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { Form } from "react-bootstrap";



const Post = () => {
  const [showActions, setShowActions] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  
  return (
    <div className="post">
      <div className="user-profile-container">
        <div className="user_img_info flexbox">
          <div className="user-img">
            <img
              src={
                "https://media.licdn.com/dms/image/D4D03AQFDcMZSbhGvzQ/profile-displayphoto-shrink_100_100/0/1699540234943?e=1709164800&v=beta&t=mNoDa6PaKU3ZV6QBLBQA3UhWyalapxTEgpQkaZ0bgXQ"
              }
              alt=""
            />
          </div>

          <div className="user-info">
            <p className="user-name">Mongalmoy</p>
            <p className="user-bio">Time: </p>
          </div>
        </div>
        {/* <div className="post-time-div">
          <i className="fas fa-globe-asia"></i>
          <p>time</p>
        </div> */}

        <div className="three-dots">
          <BiDotsVerticalRounded onClick={() => setShowActions(true)} />
          {showActions && (
            <div className="outer-display-edit-div">
              <div className="inner-display-edit-div">
                <div
                  className="close_action flexbox"
                  onClick={() => setShowActions(false)}
                >
                  <IoMdClose className="close_action_button" />
                </div>

                {[
                  {
                    name: "Save",
                    actions: "",
                    icon_before_action: <CiBookmark />,
                    icon_after_action: <FaBookmark />,
                    isActionTaken: false,
                  },
                  {
                    name: "Copy Link",
                    actions: "",
                    icon_before_action: <LuCopyPlus />,
                    icon_after_action: <LuCopyCheck />,
                    isActionTaken: false,
                  },
                  {
                    name: "Edit Post",
                    actions: "",
                    icon_before_action: <FaEdit />,
                    icon_after_action: <FaEdit />,
                    isActionTaken: false,
                  },
                  {
                    name: "Delete Post",
                    actions: "",
                    icon_before_action: <MdDeleteOutline />,
                    icon_after_action: <MdDeleteOutline />,
                    isActionTaken: false,
                  },
                ].map((el, index) => {
                  return (
                    <div className="item">
                      <div className="item-icon">
                        {el.isActionTaken
                          ? el.icon_after_action
                          : el.icon_before_action}
                      </div>
                      <div className="item-contents">
                        <div>
                          <p>{el.name}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="user_post_content">
        <div className="user_post_text">
          <p className="m-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eos
            fugiat aperiam consequuntur necessitatibus iste eligendi delectus
            officia quibusdam, quas voluptatum, odio architecto voluptates
            aliquam ab facere fugit sint quia?
          </p>
        </div>
        <div className="user_post_img">
          <img src={require("../assets/img/socialmedia.jpg")} alt="" />
        </div>
      </div>

      <div className="user_react_contents">
        <div className="comment_like_share">
          <Form onClick={() => setLikesCount(prevCnt => prevCnt+1)}>
            <AiOutlineLike />
            <span className="countLikes">{likesCount>0 ? likesCount : null}</span>
            <span>Like</span>
          </Form>
          <Form>
            <MdOutlineComment />
            <span id="countComment"></span>
            <span>Comment</span>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Post;
