export const parseNightbotChannel = (channelParams: string) => {
  const params = new URLSearchParams(channelParams);

  return {
    name: params.get("name"),
    displayName: params.get("displayName"),
    provider: params.get("provider"),
    providerId: params.get("providerId"),
  };
};

export const parseNightbotUser = (userParams: string) => {
  const params = new URLSearchParams(userParams);

  return {
    name: params.get("name"),
    displayName: params.get("displayName"),
    provider: params.get("provider"),
    providerId: params.get("providerId"),
    userLevel: params.get("userLevel"),
  };
};
