import "./Prompt.css";

const Prompt = ({ show, setShow }) => {
  return show ? (
    <div className="delete-account-div" id="delete-account-div" onClick={null}>
      <h4>Do you want to delete your account ?</h4>
      <div>
        <button className="cancel-account-delete" onClick="hideDeleteAcountAlert()">
          Cancel
        </button>
        <button href="/deleteaccount" className="primary_btn">
          Delete
        </button>
      </div>
    </div>
  ) : null;
};

export default Prompt;
