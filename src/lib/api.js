const BACKEND_DOMAIN = '';

export async function getAllQuotes() {
  const response = await fetch(`/quotes`);
  const data = await response.json();
  if (!response) {
    throw new Error(data.message || 'Could not fetch quotes.');
  }
  return data;
}

export async function addQuote(quoteData) {
  const uuid = uuidv4();
  const response = await fetch(`${BACKEND_DOMAIN}/quotes`, {
    method: 'POST',
    body: JSON.stringify({ ...quoteData, id: uuid }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response) {
    throw new Error(data.message || 'Could not create quote.');
  }

  return null;
}

export async function getSingleQuote(id) {
  const response = await fetch(`/quotes/${id}`);
  const data = await response.json();
  if (!response) {
    throw new Error(data.message || 'Could not fetch single quote.');
  }
  return data;
}

export async function deleteQuote(quoteId) {
  await fetch(`${BACKEND_DOMAIN}/quotes/${quoteId}`, {
    body: JSON.stringify({ id: quoteId }),
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return null;
}

export async function addComment(requestData) {
  const { quote, commentText } = requestData;
  const commentData = {
    id: uuidv4(),
    text: commentText,
  };
  if (quote.comments) {
    quote.comments.push(commentData);
  } else {
    quote.comments = [commentData];
  }

  const response = await fetch(`${BACKEND_DOMAIN}/quotes/${quote.id}`, {
    method: 'PUT',
    body: JSON.stringify(quote),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response) {
    throw new Error(data.message || 'Could not add comment.');
  }

  return data;
}

export async function deleteComment({ quote, commentId }) {
  quote.comments = quote.comments.filter((comment) => comment.id !== commentId);
  const response = await fetch(`${BACKEND_DOMAIN}/quotes/${quote.id}`, {
    method: 'PUT',
    body: JSON.stringify(quote),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response) {
    throw new Error(data.message || 'Could not delete comment');
  }

  return data;
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}
