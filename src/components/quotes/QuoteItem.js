import { Link } from 'react-router-dom';
import classes from './QuoteItem.module.css';

const QuoteItem = (props) => {
  const onDeleteHandler = () => {
    props.onDelete(props.id);
  };
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <div className={classes.buttonsWrapper}>
        <button onClick={onDeleteHandler} className="btn">
          Delete
        </button>
        <Link className="btn" to={`/quotes/${props.id}`}>
          View Fullscreen
        </Link>
      </div>
    </li>
  );
};

export default QuoteItem;
