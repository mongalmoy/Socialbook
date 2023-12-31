import { BiDotsVerticalRounded } from "react-icons/bi";

const Post = () => {
  return (
    <div className="post">
      <div class="user-profile-container">
        <div className="user_img_info flexbox">
          <div class="user-img">
            <img
              src={
                "https://media.licdn.com/dms/image/D4D03AQFDcMZSbhGvzQ/profile-displayphoto-shrink_100_100/0/1699540234943?e=1709164800&v=beta&t=mNoDa6PaKU3ZV6QBLBQA3UhWyalapxTEgpQkaZ0bgXQ"
              }
              alt=""
            />
          </div>

          <div class="user-info">
            <p class="user-name">Mongalmoy</p>
            <p class="user-bio">Time: </p>
          </div>
        </div>
        {/* <div class="post-time-div">
          <i class="fas fa-globe-asia"></i>
          <p>time</p>
        </div> */}

        <div class="three-dots">
          <BiDotsVerticalRounded />
          <div class="outer-display-edit-div">
            <div class="inner-display-edit-div">
              <div class="item">
                <div class="item-icon">
                  <i class="far fa-bookmark"></i>
                </div>
                <div class="item-contents">
                  <div>
                    <p>Save</p>
                    <p>Save for later</p>
                  </div>
                </div>
              </div>

              <div class="item">
                <div class="item-icon">
                  <i class="fas fa-link"></i>
                </div>
                <div class="item-contents">
                  <div>
                    <p>Copy link</p>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="item-icon">
                  <i class="fas fa-pen"></i>
                </div>
                <div class="item-contents">
                  <div>
                    <p>Edit post</p>
                  </div>
                </div>
              </div>

              <div class="item">
                <div class="item-icon">
                  <i class="fas fa-trash-alt"></i>
                </div>
                <div class="item-contents">
                  <div>
                    <p>Delete post</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
