export const UserUtils = {
  getClaims: async function (user: any) {
    if (user === null || user === undefined) return {};

    return JSON.parse(user.reloadUserInfo.customAttributes);
  },
};
