export interface CreateArticleDto {
  title: string;
  description: string;
}
export interface UpdateArticleDto {
  title?: string;
  description?: string;
}

export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginrUserDto {
  email: string;
  password: string;
}
