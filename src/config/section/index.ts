import yaml from 'yaml';

const yamlString = `
HOME:
    WLC_STACK: WLC_STACK
    MY_STACK: MY_STACK
    APPEND_STACK: APPEND_STACK
    VIDEO_STACK: VIDEO_STACK

`;

export default yaml.parse(yamlString);
