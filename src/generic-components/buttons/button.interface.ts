export interface IButtonProps {
  text: string;
  handleClick: () => any;
}

export interface IPressableButtonProps {
  text: string;
  onPress: () => any;
  isValid: boolean;
}
