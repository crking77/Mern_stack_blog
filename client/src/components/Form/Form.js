import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

import useStyles from "./style";
import { createPost, updatePost } from "../../action/posts";
function Form({ currentId, setCurrentId }) {
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));
  const [postsData, setPostsData] = useState({
    title: "",
    tags: "",
    message: "",
    selectedFile: "",
  });
  useEffect(() => {
    if (post) setPostsData(post);
  }, [post]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const clear = () => {
    setCurrentId(null);
    setPostsData({
      title: "",
      tags: "",
      message: "",
      selectedFile: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postsData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postsData, name: user?.result?.name }));
    }
    clear();
  };
  console.log("user?.result: ", user?.result);
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  } else
    return (
      <Paper className={classes.paper}>
        <form
          className={`${classes.root} ${classes.form}`}
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {currentId ? "Editing" : "Creating"} a Memory
          </Typography>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postsData.title}
            onChange={(e) =>
              setPostsData({ ...postsData, title: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postsData.tags}
            onChange={(e) =>
              setPostsData({ ...postsData, tags: e.target.value.split(",") })
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postsData.message}
            onChange={(e) =>
              setPostsData({ ...postsData, message: e.target.value })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              name="selectedFile"
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostsData({ ...postsData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="secondary"
            size="large"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    );
}

export default Form;
