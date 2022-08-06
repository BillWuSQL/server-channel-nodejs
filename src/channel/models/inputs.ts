export class ChannelModel {
  id: string;
  name: string;
}

export interface IngoingModel {
  id: string; 
  title: string; 
  content : string;
  
}

export class MessageModel implements IngoingModel {
  id: string; 
  title: string; 
  content : string;
  channel : string;
  createdAt : Long;
}


