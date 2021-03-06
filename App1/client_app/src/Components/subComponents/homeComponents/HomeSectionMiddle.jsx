import React, { useState } from "react";
import { useSelector } from 'react-redux';
import Avatar from "../../assets/Avatar";

const HomeSectionMiddle = () => {
    const [value, setValue] = useState("");
    const [image, setImage] = useState("");

    const user = useSelector(state => state.loggedUser);

    const updateValue = e => {
        setValue(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    const onAddPost = () => {
        fetch('graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                    mutation {
                      posts {
                        addPost(post: { body: "${value}", userId: "${user.id}", image: "${image}"}) {
                          body
                        }
                      }
                    }`
            }),
        })
            .then(res => res.json())
            .then(res => console.log(res))
    }

        return (
          <div className="section-middle">
            <div className="avatar-container">
              <div className="avatar">
                 <Avatar picture={user.picture} />
              </div>
            </div>
                <div className="tweet-input">
                    <PostInput updateValue={updateValue}/>
              <div className="tweet-input-utility">
                <div className="utility-left">
                     <AddMultimedia setImage={setImage}/>
                </div>
                <div className="utility-right">
                     <AddPost onAddPost={onAddPost} />
                </div>
              </div>
            </div>
          </div>
        );
}

const AddPost = ({ onAddPost }) => 
    <div className="tweet-btn btn-container">
        <button href="#tweet" className="btn btn-small btn-solid" onClick={onAddPost}>
            <span>Add Post</span>
        </button>
    </div>

const AddMultimedia = ({ setImage }) => {

    const readURL = (e) => {
        const image = e.target.files[0];
        let reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result)
        };

        reader.readAsDataURL(image);
    }

    return (
        <div className="a-container">
            <svg viewBox="0 0 24 24" className="main-img">
                <g>
                    <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path>
                    <circle cx="8.868" cy="8.309" r="1.542"></circle>
                </g>
            </svg>
            <input
                type="file"
                id="file-upload"
                onChange={readURL}
                accept="image/png, image/jpeg, image/jpg"
            />
        </div>
    );
}

const PostInput = ({ updateValue }) => 
    <div className="input">
        <textarea
            id="text"
            maxLength="140"
            name="tweet-text"
            rows="1"
            placeholder="What's happening?"
            autoComplete="off"
            spellCheck="false"
            onChange={updateValue}
            autoFocus
        ></textarea>
    </div>

export default HomeSectionMiddle;
