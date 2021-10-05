const saveUser = async (user) => {
  const response = await fetch('http://localhost:5000/api/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  console.log(user);
  return response.json();
};

const checkEmail = async (email) => {
  const response = await fetch('http://localhost:5000/api/email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email)
  });
  return response.json();
};

export {saveUser, checkEmail};
