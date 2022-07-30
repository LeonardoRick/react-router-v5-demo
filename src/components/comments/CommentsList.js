import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';

const CommentsList = (props) => {
  return (
    <ul className={classes.comments}>
      {props.comments.map((comment) => (
        <CommentItem
          quote={props.quote}
          key={comment.id}
          id={comment.id}
          text={comment.text}
          onCommentDeleted={props.onCommentDeleted}
        />
      ))}
    </ul>
  );
};

export default CommentsList;
