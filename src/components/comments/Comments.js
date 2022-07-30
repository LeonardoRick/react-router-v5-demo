import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getSingleQuote } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { sendRequest, status, data: quote } = useHttp(getSingleQuote);
  const { quoteId } = useParams();

  useEffect(() => {
    sendRequest(quoteId);
    console.log('reloaded');
  }, [sendRequest, quoteId]);

  let loadedComments = (quote && quote.comments) || [];
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const reloadComments = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comments = <p>Comments...</p>;

  if (status === 'pending') {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'completed' && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList quote={quote} comments={loadedComments} onCommentDeleted={reloadComments} />;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quote={quote} onAddComment={reloadComments} quoteId={quoteId} />}

      {comments}
    </section>
  );
};

export default Comments;
