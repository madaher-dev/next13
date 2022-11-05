import axios from "axios";

export const post = (body, url, type, typeFail) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let start = Date.now();
    const res = await axios.post(`${url}`, body, config);
    let end = Date.now();
    dispatch({
      type,
      payload: res?.data,
    });
  } catch (err) {
    dispatch({
      type: typeFail,
      payload: err?.response?.data?.message,
    });
  }
};

export const get = (url, type, typeFail) => async (dispatch) => {
  // console.log("GET", url);
  try {
    const res = await axios.get(`${url}`);

    dispatch({
      type,
      payload: res?.data,
    });
  } catch (err) {
    dispatch({
      type: typeFail,
      payload: err?.response?.data?.message,
    });
  }
};

export const patch = (body, url, type, typeFail) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.patch(`${url}`, body, config);

    dispatch({
      type,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: typeFail,
      payload: err?.response?.data.message,
    });
  }
};

export const put = (body, url, type, typeFail) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put(`${url}`, body, config);

    dispatch({
      type,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: typeFail,
      payload: err?.response?.data.message,
    });
  }
};

export const deleteById = (id, url, type, typeFail) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    await axios.delete(`${url}/${id}`, config);

    dispatch({
      type,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: typeFail,
      payload: err?.response?.data.message,
    });
  }
};
