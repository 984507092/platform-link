export interface LinkNodeType {
  id?: string | number;
  name: string;
  link: string;
  icon: string;
  parentName: string | null;
  children?: LinkNodeType[]
}
