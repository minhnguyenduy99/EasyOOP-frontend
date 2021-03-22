const user = {
  user_id: "6056bee551fa3a8735c55c8d"
};

export default {
  login(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          error: null,
          data: {
            user
          }
        });
      }, 1000);
    });
  }
};
