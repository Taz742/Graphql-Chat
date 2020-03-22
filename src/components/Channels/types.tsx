export interface Channel {
  id: string;
  name: string;
  organization: string;
  nameNormalized: string;
  description: string;
  color: string;
};

export interface ChannelData {
  channels: Channel[]
};
