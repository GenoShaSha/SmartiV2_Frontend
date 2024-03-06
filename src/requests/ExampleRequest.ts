
// const URL = import.meta.env.VITE_FIREBASE_APPROVE_CLIENT || "";
export async function callRequestCalculation(body: any): Promise<any> {
  const token ="";

  return new Promise(async (resolve, reject) => {
    fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
          body
      }),
      mode: "cors",
    })
      .then((response) => {
        resolve(response);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}
