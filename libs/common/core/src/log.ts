const baseStyle = `
border-radius: 2px;
display: inline-block;
font-family: monospace;
font-size: 13px;
font-weight: 800;
line-height: 1;
padding: 1px;
text-transform: uppercase;
white-space: nowrap;
`;

export const Log = {
  info: (...args: unknown[]) => {
    const [label, ...rest] = args;
    console.log(
      `%c info\\${label}`,
      `background-color: #7dd3fc; color: #0284c7; ${baseStyle}`,
      ...rest,
    );
  },
  fatal: (...args: unknown[]) => {
    const [label, ...rest] = args;
    console.log(
      `%c fatal\\${label}`,
      `background-color: #fca5a5; color: #b91c1c; ${baseStyle}`,
      ...rest,
    );
  },
  warning: (...args: unknown[]) => {
    const [label, ...rest] = args;
    console.log(
      `%c warning\\${label}`,
      `background-color: #fcd34d; color: #b45309; ${baseStyle}`,
      ...rest,
    );
  },
  debug: (...args: unknown[]) => {
    const [label, ...rest] = args;
    console.log(
      `%c debug\\${label}`,
      `background-color: #d8b4fe; color: #7e22ce; ${baseStyle}`,
      ...rest,
    );
  },
};
