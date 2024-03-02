import "./UserAccount.css";
import defaultUserDP from "../../assets/img/avatar.png";
import { FaEdit } from "react-icons/fa";
import { IoCamera } from "react-icons/io5";
import { useState } from "react";
import { userInfoSchema } from "../../Data/pages/accounts/accountSchema";
import Swal from "sweetalert2";

const UserAccount = () => {
  const [showUploadRemoveBtn, setShowUploadRemoveBtn] = useState(false);
  const [userDetils, setUserDetials] = useState(userInfoSchema);

  function removeAccPageRemoveUploadButton() {}

  function showDeletePrompt() {
    Swal.fire({
      icon:"warning",
      text: "Do you want to delete your account?",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "rgb(34 102 4)",
      confirmButtonColor: "#FF0303",
      confirmButtonText: "Delete"
    }).then((result) => {
      if(result.isConfirmed) {
        console.log("yes delete account")
      }
    })
  }

  return (
    <div className="account-page" id="accountpage">
      <div className="account-page-section">
        <div className="account-page-edit-container _uhiuh7yh9uiu">
          {/* Edit Icon */}
          <a className="accountpage-edit-link" href="">
            <FaEdit />
          </a>

          <div className="account-page-name-img">
            <div className="__hiuhuh998h py-2">
              <div className="img">
                <img src={defaultUserDP} alt="user_img" />
                <div
                  className="camera-icon"
                  onClick={() => {
                    setShowUploadRemoveBtn((prev) => !prev);
                  }}
                >
                  {/* <i className="bx bxs-camera"></i> */}
                  <IoCamera />
                </div>
                <input
                  id="AccPageInputProfile"
                  style={{ display: "none" }}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="inputProfileImg"
                />
                {showUploadRemoveBtn && (
                  <div
                    className="upload-remove"
                    id="account-page-dp-upload-remove"
                  >
                    <p onClick={null}>Upload photo</p>
                    <p>Remove photo</p>
                  </div>
                )}
              </div>
              <div className="name" onClick={removeAccPageRemoveUploadButton}>
                <h4>Mongalmoy Karmakar</h4>
              </div>
            </div>
          </div>

          {/* Personal Info Starts */}
          <div className="account-section" id="social-info">
            {userDetils?.map((el, ind) => {
              return (
                <div key={ind} className="account_section_heading">
                  <h2 className="my-2">
                    {ind + 1} {el?.heading}
                  </h2>
                  <div className="account-page-details">
                    {Object.keys(el?.content)?.map((contentKey, index) => {
                      return (
                        <div
                          key={index}
                          className="account_page_details_content"
                        >
                          <div className="account-page-details-name">
                            <p>{el?.content[contentKey]?.key} :</p>
                          </div>
                          <div className="account-page-details-value">
                            <p>{el?.content[contentKey]?.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <hr />
                </div>
              );
            })}
          </div>

          <div className="accountpage-delete-button my-2">
            <button onClick={showDeletePrompt}>
              Delete Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserAccount;
