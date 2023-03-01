import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip';

const Tooltip = ({ children, title }: TooltipProps) => {
  return <MuiTooltip title={title}>{children}</MuiTooltip>;
};

export default Tooltip;
