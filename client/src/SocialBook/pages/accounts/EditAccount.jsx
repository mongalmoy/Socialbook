import { useEffect, useState } from "react";
import "./UserAccount.css";
import { editUserPageFields } from "../../Data/pages/accounts/accountSchema";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getBase64 } from "../../common/getBase64";
import { PiWarningCircleBold } from "react-icons/pi";
import { config } from "../../Data/pattern";
import { doPOST, doPOSTWithToken } from "../../common/apicalling/doPOST";

const EditAccount = () => {
  const {
    register,
    unregister,
    formState: { errors, isValid, isValidating, isLoading, isSubmitSuccessful },
    setError,
    clearErrors,
    getValues,
    watch,
    handleSubmit,
    reset,
    resetField,
    trigger,
    setValue,
    setFocus,
    getFieldState,
    control,
  } = useForm({ mode: "onChange" });

  const [headings, setHeadings] = useState(editUserPageFields?.headings);
  const [currentHeading, setCurrentHeading] = useState(0);
  const [userImg, setUserImg] = useState("");
  const [userEditInfo, setUserEditInfo] = useState({
    userImg: "",
    name: "",
    dob: "",
    gender: "",
    workingAt: "",
    userBio: "",
    linkedin: "",
    github: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    personalWebsite: "",
    mobile: "",
    email: "",
    optionalEmail: "",
    hometown: "",
    country: "",
    address: "",
    pin: "",
    mobile: "",
  });

  function handleClickLink(index) {
    setCurrentHeading(index);
    console.log(index);
    setHeadings((prev) => {
      const newEditDetails = prev?.map((el, idx) =>
        index === idx
          ? { ...el, className: "edit-links active" }
          : { ...el, className: "edit-links" }
      );
      return newEditDetails;
    });
  }

  async function updateUserDetails() {
    const updateRes = await doPOSTWithToken("updateuser", {
      ...getValues()?.personal,
      ...getValues()?.social,
      ...getValues()?.communication,
      userImg: userImg
    });
    console.log(updateRes);
  }

  console.log("headings", headings);
  // console.log("userEditInfo", userEditInfo);
  // console.log("userImg", userImg);
  console.log("form values", watch());
  console.log("form errors", errors);

  return (
    <div className="account-page">
      <div className="account-page-edit-section">
        <nav className="edit_container_nav">
          <ul>
            {headings?.map((el, ind) => {
              return (
                <li key={ind} className={el?.className}>
                  <a
                    href={`#${el?.refId}`}
                    // aria-selected={el?.areaSelected}
                    tabIndex={el?.tabIndex}
                    onClick={() => handleClickLink(ind)}
                  >
                    {el?.name}
                    {ind === 0 ? (
                      errors?.personal && Object.keys(errors?.personal) ? (
                        <PiWarningCircleBold />
                      ) : null
                    ) : ind === 1 ? (
                      errors?.social && Object.keys(errors?.social) ? (
                        <PiWarningCircleBold />
                      ) : null
                    ) : errors?.communication &&
                      Object.keys(errors?.communication) ? (
                      <PiWarningCircleBold />
                    ) : null}
                    {/* {el?.pending ? <PiWarningCircleBold /> : null} */}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="account-page-edit-container">
          <Form onSubmit={handleSubmit(updateUserDetails)}>
            <section
              style={
                currentHeading === 0
                  ? { display: "block" }
                  : { display: "none" }
              }
              className="accountedit-section"
              id="personal-section"
            >
              <div className="mb-3">
                <h6>Upload profile picture of yourself</h6>
                <p style={{ fontSize: "12px" }} className="m-0 mb-2">
                  Upload files of type jpeg, jpg, png only. Max size : 1MB.
                </p>
                <Form.Control
                  name="userImg"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  {...register("personal.userImg", {
                    required: false,
                    onChange: async (e) => {
                      const fileData = await getBase64(e.target.files[0]);
                      if (fileData?.returnKey) {
                        setValue("personal.userImg", fileData?.data);
                        setUserImg(fileData?.data);
                      }
                    },
                  })}
                  className={errors?.personal?.userImg ? "is-invalid" : ""}
                />
              </div>

              <div className="mb-3">
                <h6>
                  Your Name: <sup className="star">*</sup>{" "}
                </h6>

                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter full name"
                  {...register("personal.name", {
                    required: true,
                    pattern: eval(config.name.pattern.value),
                    minLength: Number(config.name.minLen.value),
                    maxLength: Number(config.name.maxLen.value),
                  })}
                  className={
                    errors?.personal?.name ? "name is-invalid" : "name"
                  }
                />
                {errors?.personal?.name?.type === "pattern" ? (
                  <p className="error_msg">{config.name.pattern.message}</p>
                ) : errors?.personal?.name?.type === "minLength" ? (
                  <p className="error_msg">{config.name.minLen.message}</p>
                ) : errors?.personal?.name?.type === "maxLength" ? (
                  <p className="error_msg">{config.name.maxLen.message}</p>
                ) : errors?.personal?.name ? (
                  <p className="error_msg">please enter name</p>
                ) : null}
              </div>

              <div className="mb-3">
                <h6>
                  Your DOB: <sup className="star">*</sup>{" "}
                </h6>
                <Form.Control
                  name="dob"
                  type="date"
                  {...register("personal.dob", {
                    required: true,
                    min: config.dob.min.value,
                    max: config.dob.max.value,
                  })}
                  className={errors?.personal?.dob ? "is-invalid" : ""}
                />
                {errors?.personal?.dob?.type === "pattern" ? (
                  <p className="error_msg">{config.dob.pattern.message}</p>
                ) : errors?.personal?.dob?.type === "min" ? (
                  <p className="error_msg">{config.dob.min.message}</p>
                ) : errors?.personal?.dob?.type === "max" ? (
                  <p className="error_msg">{config.dob.max.message}</p>
                ) : errors?.personal?.dob ? (
                  <p className="error_msg">please enter date of birth</p>
                ) : null}
              </div>

              <div className="mb-3">
                <h6>
                  Gender: <sup className="star">*</sup>{" "}
                </h6>
                <div className="gender-section p-0">
                  {[
                    { name: "Male", value: "MALE" },
                    { name: "Female", value: "FEMALE" },
                  ]?.map((el, ind) => (
                    <div key={ind} className="me-4">
                      <Form.Check
                        key={ind}
                        type="radio"
                        id={el?.value}
                        name="gender"
                        {...register("personal.gender", {
                          required: true,
                        })}
                        className={errors?.personal?.dob ? "is-invalid" : ""}
                      />
                      <label htmlFor={el?.value}>{el?.name}</label>
                    </div>
                  ))}
                </div>
                {errors?.personal?.gender ? (
                  <p className="error_msg">please select gender</p>
                ) : null}
              </div>

              <div className="separate-div mb-3">
                <h6>Currently Working At:</h6>
                <Form.Control
                  name="workingAt"
                  type="text"
                  placeholder="Enter organization"
                  {...register("personal.workingAt", {
                    required: false,
                  })}
                  className={errors?.personal?.workingAt ? "is-invalid" : ""}
                />
              </div>

              <div>
                <h6>Something About You:</h6>
                <Form.Control
                  name="userBio"
                  as="textarea"
                  placeholder="Enter something about yourself"
                  row="1"
                  col="30"
                  {...register("personal.userBio", {
                    required: false,
                  })}
                  className={errors?.personal?.userBio ? "is-invalid" : ""}
                />
              </div>
            </section>

            <section
              className={editUserPageFields.formSection.social.className}
              id={editUserPageFields.formSection.social.id}
              style={
                currentHeading === 1
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              {editUserPageFields.formSection.social.fields.map((el, ind) => {
                return (
                  <div key={ind} className="mb-3">
                    <h6>
                      {el?.keyName} {" : "}{" "}
                      {el?.mandatory && <sup className="star">*</sup>}
                    </h6>
                    {el?.type === "textarea" ? (
                      <Form.Control
                        as="textarea"
                        placeholder={el?.placeholder}
                        {...register(`social.${el?.name}`, {
                          required: el?.mandatory,
                        })}
                        className={
                          errors?.social?.[el?.name] ? "is-invalid" : ""
                        }
                      />
                    ) : (
                      <Form.Control
                        placeholder={el?.placeholder}
                        type={el?.type}
                        {...register(`social.${el?.name}`, {
                          required: el?.mandatory,
                        })}
                        className={
                          errors?.social?.[el?.name] ? "is-invalid" : ""
                        }
                      />
                    )}
                  </div>
                );
              })}
            </section>

            <section
              className={editUserPageFields.formSection.communication.className}
              id={editUserPageFields.formSection.communication.id}
              style={
                currentHeading === 2
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              {editUserPageFields.formSection.communication.fields.map(
                (el, ind) => {
                  return (
                    <div key={ind} className="mb-3">
                      <h6>
                        {el?.keyName} {" : "}{" "}
                        {el?.mandatory && <sup className="star">*</sup>}
                      </h6>
                      {el?.type === "textarea" ? (
                        <Form.Control
                          as="textarea"
                          placeholder={el?.placeholder}
                          {...register(`communication.${el?.name}`, {
                            required: el?.mandatory,
                          })}
                          className={
                            errors?.communication?.[el?.name]
                              ? "is-invalid"
                              : ""
                          }
                        />
                      ) : (
                        <Form.Control
                          placeholder={el?.placeholder}
                          type={el?.type}
                          {...register(`communication.${el?.name}`, {
                            required: el?.mandatory,
                          })}
                          className={
                            errors?.communication?.[el?.name]
                              ? "is-invalid"
                              : ""
                          }
                        />
                      )}
                    </div>
                  );
                }
              )}
            </section>

            <button className="primary_btn mt-3" type="submit">
              Save
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
