import { useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import { deleteComment } from '../../lib/api';
import classes from './CommentItem.module.css';

const CommentItem = (props) => {
  const { onCommentDeleted } = props;
  const { sendRequest, status, error } = useHttp(deleteComment);
  useEffect(() => {
    if (status === 'completed' && !error) {
      onCommentDeleted();
    }
  }, [status, error, onCommentDeleted]);

  const deleteCommentHandler = () => {
    sendRequest({ quote: props.quote, commentId: props.id });
  };
  return (
    <li className={classes.item}>
      <p>{props.text}</p>
      <div>
        <button onClick={deleteCommentHandler} className="btn">
          Delete Comment
        </button>
      </div>
    </li>
  );
};

export default CommentItem;
