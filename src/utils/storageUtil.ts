const storageUtil = {
  getData: (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  setData: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getTimestamp: (key: string) => {
    const timestamp = localStorage.getItem(key);
    return timestamp ? parseInt(timestamp, 10) : null;
  },

  setTimestamp: (key: string) => {
    const currentTime = Date.now();
    localStorage.setItem(key, currentTime.toString());
  },
};

export default storageUtil;
