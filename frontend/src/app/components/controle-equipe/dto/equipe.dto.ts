export interface EquipeIn {
  id: string;
  name: string;
}

export interface UserTeamIn {
  name: string;
  email: string;
}

export interface EquipeDTO2 {
  userId: string; 
  teamId: string; 
  team: { 
      id: string; 
      name: string; 
  };

}

export interface UserIn {
  id: string;
  name: string;
  
  
}
