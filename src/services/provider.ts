import axios from "axios";

export const provider = {
  get: async (url: string, rest: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        method: "GET",
        url: url,
        ...rest,
      },
    };
    const res = await axios(url);
    return res.data;
  },
};
