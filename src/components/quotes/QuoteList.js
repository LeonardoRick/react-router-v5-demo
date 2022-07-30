import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortMap = {
  asc: {
    label: 'Descending',
    invert: 'desc',
  },
  desc: {
    label: 'Ascending',
    invert: 'asc',
  },
};

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sort = queryParams.get('sort'); // sort value should be 'asc' or 'desc'
  const sortedQuotes = sortQuotes(props.quotes, sort === 'asc');

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${sortMap[sort]?.invert || 'asc'}`,
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>Sort {sortMap[sort]?.label || 'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem key={quote.id} id={quote.id} author={quote.author} text={quote.text} onDelete={props.onDelete} />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
