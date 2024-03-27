export interface LinkNodeType {
  name: string;
  link: string;
  icon: string;
  parentName: string | null;
  children?: LinkNodeType[]
}
