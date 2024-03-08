import "./UserAccount.css";
import { useNavigate } from "react-router-dom";
import defaultUserDP from "../../assets/img/avatar.png";
import { FaEdit } from "react-icons/fa";
import { IoCamera } from "react-icons/io5";
import { useEffect, useState } from "react";
import { userInfoSchema } from "../../Data/pages/accounts/accountSchema";
import Swal from "sweetalert2";
import { doGETWithToken, doPOSTWithToken } from "../../common/apicalling/doPOST";

const UserAccount = () => {
  const navigate = useNavigate();

  const [showUploadRemoveBtn, setShowUploadRemoveBtn] = useState(false);
  const [userDetils, setUserDetials] = useState(userInfoSchema);

  useEffect(() => {
    (async () => {
      const userDetailsRes = await doPOSTWithToken("userdetails", {
        email: sessionStorage.getItem("email")
      })
      // console.log("userDetails", userDetailsRes)
      if(userDetailsRes.retrunStr==="error") {

      } else {
        setUserDetials(prev => {
          prev[0].content.name.value = userDetailsRes.responseBody.userDetails.name;
          prev[0].content.dob.value = userDetailsRes.responseBody.userDetails.dob;
          prev[0].content.gender.value = userDetailsRes.responseBody.userDetails.gender;
          prev[0].content.workingAt.value = userDetailsRes.responseBody.userDetails.workingAt;

          prev[1].content.linkedin.value = userDetailsRes.responseBody.userDetails.linkedin;
          prev[1].content.github.value = userDetailsRes.responseBody.userDetails.github;
          prev[1].content.facebook.value = userDetailsRes.responseBody.userDetails.facebook;
          prev[1].content.instagram.value = userDetailsRes.responseBody.userDetails.instagram;
          prev[1].content.website.value = userDetailsRes.responseBody.userDetails.website;

          prev[2].content.email.value = userDetailsRes.responseBody.userDetails.email;
          prev[2].content.optionalEmail.value = userDetailsRes.responseBody.userDetails.optionalEmail;
          prev[2].content.homeTown.value = userDetailsRes.responseBody.userDetails.homeTown;
          prev[2].content.country.value = userDetailsRes.responseBody.userDetails.country;
          prev[2].content.address.value = userDetailsRes.responseBody.userDetails.address;
          prev[2].content.pincode.value = userDetailsRes.responseBody.userDetails.pincode;
          prev[2].content.mobile.value = userDetailsRes.responseBody.userDetails.mobile;
          return [...prev];
        })
      }
    })()
  }, [])

  console.log("userDetils", userDetils)

  function removeAccPageRemoveUploadButton() {}

  function showDeletePrompt() {
    Swal.fire({
      icon: "warning",
      text: "Do you want to delete your account?",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "rgb(34 102 4)",
      confirmButtonColor: "#FF0303",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
      }
    });
  }

  return (
    <div className="account-page" id="accountpage">
      <div className="account-page-section">
        <div className="account-page-edit-container _uhiuh7yh9uiu">
          {/* Edit Icon */}
          <button
            className="accountpage-edit-link"
            onClick={() => {
              navigate("edit");
            }}
          >
            <FaEdit />
          </button>

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
            <button onClick={showDeletePrompt}>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
